import { baseURL } from '../../config'
import uuid from '../uuid'
import axios from 'axios'
class Upload {
  constructor(param) {
    this.file = param.file // [File Object]
    this.code = param.code // code ? '' : 'ae554ed2-cbc2-468c-a357-f0f92b97c481'
    this.token = param.token // 用户token
    this.getProgress = param.progress // 单个文件上传进度回调
    this.uploadFile = param.upload // 所有文件上传结束回调
    this.signInfo = {}
    this.uploadProgress = 0
    this.progressArr = []
    this.axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  }
  upload() {
    return this.getFormDataFile()
  }
  // 获取签字
  getSignature() {
    return new Promise((resolve, reject) => {
      if (this.signInfo.key) {
        resolve({ ...this.signInfo })
      } else {
          axios({
            url: baseURL + `/SystemMethod/MakeAutograph?Token=${this.token}`,
            method: 'post'
          })
            .then(({ data }) => {
              this.signInfo = JSON.parse(data.Data)
              resolve({ ...this.signInfo })
          }).catch(e => {
            reject(e)
          })
      }
    })
  }
  // 处理上传文件
  getFormDataFile() {
    this.uploadProgress = 0.1
    return this.getSignature().then(sign => {
      const promiseArr = []
      const imgArr = []
      this.progressArr = new Array(this.file.length).fill(0)
      this.file.forEach((file, index) => {
        const newKey = sign.dir + new Date().getTime() + `_` + uuid()
        promiseArr.push(
          this.uploadOSSSingle(file, { ...sign, key: newKey }, index)
        )
        imgArr.push({
          ImageLocation: '/' + newKey,
          UniqueCode: this.code || ''
        })
      })
      return this.uploadAllSave(promiseArr, imgArr)
    })
  }
  // 上传到OSS
  uploadOSSSingle(file, sign, index) {
    return new Promise((resolve, reject) => {
      const param = new FormData()
      param.append('key', sign.key)
      param.append('policy', sign.policy)
      param.append('OSSAccessKeyId', sign.accessid)
      param.append('success_action_status', '200')
      param.append('callback', sign.callback)
      param.append('signature', sign.signature)
      param.append('file', file)
      axios({
        url: sign.host,
        method: 'post',
        data: param,
        config: this.axiosConfig,
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            this.progressArr[index] = Math.ceil(progressEvent.loaded * 100 / progressEvent.total)
            this.calcProgress()
            this.getProgress(this.uploadProgress)
          }
        }
      }).then(() => {
          resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
  // 图片上传并保存
  uploadAllSave(promise, img) {
    return new Promise((resolve, reject) => {
      Promise.all(promise).then(() => {
        axios({
          url: baseURL + `/SystemMethod/imageUpDirect?Token=${this.token}`,
          method: 'post',
          data: {
            imageUploads: img
          }
        }).then(({ data }) => {
          if (data.Code === 0) {
            if (this.uploadFile && typeof this.uploadFile === 'function') {
              this.uploadFile(data.Data)
            }
            resolve(data.Data)
          } else {
            reject(e => {
              throw new Error(e)
            })
          }
        }).catch(e => {
            this.uploadProgress = 0
            throw new Error(e)
        })
      }).catch(e => {
        this.uploadProgress = 0
        throw new Error(e)
      })
    })
  }
  calcProgress() {
    const num = this.progressArr.reduce((a, b) => { return a + b }, 0)
    this.uploadProgress = Math.ceil(num / this.progressArr.length)
  }
}
export default Upload

import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtImagePicker, AtButton } from 'taro-ui'
import './index.scss'
import { View } from '@tarojs/components'
import storage from '@/utils/storage'
import { MakeAutograph, imageUpDirect } from '@/api/system'
import {baseURL} from '@/config/index'
import uuid from '@/utils/uuid'

export default class Index extends Taro.Component {
  constructor () {
    // super(...arguments)
    this.state = {
      path: '',
      imgArr: [],
      imgIdx: 0,
      viewData: [],
      showImageView: false,
      loading: false
    }
    this.signInfo = {}
    this.maxLength = 20
    this.limitSize = 20
    this.url = ''
  }

  config = {
    navigationBarTitleText: '上传图片'
  }
  
  componentWillMount() {
    const params = getCurrentInstance().router.params
    if (params && params.path) {
      this.setState({path})
    }

    storage.get('token').then(token => {
      this.url = `${baseURL}/SystemMethod/imageUp?Token=${token}`
    })
  }  

  uploadImage(url, imgAry) {
    let formData = new FormData() // 因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
    for (var i = 0; i < imgAry.length; i++) {
      let file = {
        uri: imgAry[i],
        type: 'application/octet-stream',
        name: 'image.png'
      } //这里的key(uri和type和name)不能改变,
      formData.append('file', file) //这里的files就是后台需要的key
    }
    return Taro.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
  }  

  onPress = () => {
    if(this.state.imgArr.length>=this.maxLength){
      Taro.showToast({
        title: `一次最多上传${this.maxLength}张，请删除后再添加`,
        icon: 'none'
      })
      return
    }
    this.ActionSheet.show()
  }  
  
  onChange(files) {
    const imgArr = [...this.state.imgArr]
    // 去重和去掉大图片
    let flag = false
    images = images.filter(x=>{
      console.log(x.size)
      const sizeFlag = x.size>this.limitSize*1024*1024
      if(sizeFlag){
        flag = true
      }
      return imgArr.findIndex(y=>y.path===x.path)===-1&&!sizeFlag
    })
    if(flag){
      Taro.showToast({
        title: `已过滤大于${this.limitSize}m的图片`,
        icon: 'none'
      })
    }
    if(imgArr.length+images.length>this.maxLength){
      images.length = this.maxLength -imgArr.length
      !flag&&Taro.showToast({
        title: `一次最多上传${this.maxLength}张，请删除后再添加`,
        icon: 'none'
      })
    }
    imgArr.push(...images)
    const viewData = imgArr.map((x) => {
      return {
        ImageLocation: x.path
      }
    })
    this.setState({
      imgArr,
      viewData
    })
  }

  getSignature() {
    return new Promise((resolve, reject) => {
      if (this.signInfo.key) {
        resolve({ ...this.signInfo })
      } else {
        MakeAutograph()
          .then(({ Data }) => {
            this.signInfo = JSON.parse(Data)
            console.log(this.signInfo)
            resolve({ ...this.signInfo })
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  }  
  
  onContinuePress = async () => {
    if (this.state.loading) return
    if (this.state.imgArr.length === 0) {
      Taro.showToast({
        title: `请先添加图片!`,
        icon: 'none'
      })
      return
    }
    this.setState({
      loading: true
    })
    console.log(this.state.imgArr)
    this.uploadAll(this.state.imgArr)
  }
  
  uploadAll(imgs) {
    // 上传所有图片
    this.getSignature().then(sign => {
      const promiseArr = []
      const imgArr = []
      imgs.forEach((file) => {
        let mime = ''
        switch(file.mime) {
          case 'image/jpeg':
            mime = '.jpg'
            break
          case 'image/jpg':
            mime = '.jpg'
            break
          case 'image/png':
            mime = '.png'
            break
        }
        const newKey = sign.dir + new Date().getTime() + `_` + uuid() + mime
        // file.name = newKey // TODO
        promiseArr.push(
          this.uploadOSSSingle(file.path, {
            ...sign,
            key: newKey
          })
        )
        imgArr.push({
          ImageLocation: '/' + newKey,
          UniqueCode: ''
        })
      })
      Promise.all(promiseArr).then(() => {
        // 图片上传并保存
        imageUpDirect({
          imageUploads: imgArr
        }).then((res) => {
          Taro.showModal({
            title: '温馨提示',
            content: '图片上传成功',
            success: function (res) {
              if (res.confirm) {
                this.props.dispatch(
                  setUploadImg({
                    type: getCurrentInstance().router.params.type,
                      id: getCurrentInstance().router.params.id,
                    data: res.Data
                  })
              )
              Taro.navigateBack()              
              }
            }
          })
        }).catch((e) => {
          Taro.showToast({
            title: `上传失败，请重新上传1!`,
            icon: 'none'
          })           
        })
      }).catch(() => {
        Taro.showToast({
          title: `上传失败，请重新上传0!`,
          icon: 'none'
        })        
      })
    })
  }  
  
  onFail(mes) {
    console.log(mes)
  }

  onImageClick = (index, file) => {
    console.log(index, file)
  }

  render () {
    return (
      <View>
        <Text>1</Text>
        <AtImagePicker
          multiple
          showAddBtn={true}
          length={4}
          mode={'scaleToFill'}
          files={this.state.imgArr}
          onImageClick={this.onImageClick}
          onChange={this.onChange.bind(this)}
          sourceType={['album', 'camera']}
        />
        <AtButton
          type="primary"
          loading={this.state.loading}
          onClick={this.onPress}
        >{this.state.loading ? '上传中...' : '点击上传'}</AtButton>
      </View>
    )
  }
}
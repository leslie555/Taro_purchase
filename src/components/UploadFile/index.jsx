import Taro from '@tarojs/taro'
import { baseURL } from '@/config'
import { View, Image } from '@tarojs/components'
import storage from '@/utils/storage'
import { getImgUrl, getThumbImgUrl } from '@/utils/imgUnit'
import './index.scss'

class UploadFile extends Taro.Component {
  state = {
    imgUrl: '',
    imgUrlVal: '',
    token: Taro.getStorageSync('token')
  }
  
  uploadFile = () => {
    Taro.chooseImage({
      count: this.props.multiple ? 10 : 1,
      success: ({ tempFiles, tempFilePaths }) => {
        let flag = false
        tempFiles.map(x => {
          if (x.size > this.state.limit * 1024 * 1024) {
            flag = false
          }
        })
        if (flag) {
          Taro.showToast({
            title: '不能上传大于4M的图片',
            icon: 'none'
          })
        } else {
          this.postFile(tempFilePaths)
        }
      }
    })
  }
  
  postFile(urls) {
    Taro.uploadFile({
      url: baseURL + '/upload',
      filePath: urls[0],
      name: 'file',
      header: {
        'Authorization': `Bearer ${this.state.token}`
      },
      success: ({ data }) => {
        data = JSON.parse(data)
        if (data.code === 200) {
          const imgUrl = getImgUrl(data.data)
          const imgUrlVal = data.data
          this.setState({
            imgUrl,
            imgUrlVal
          })
        } else {
          Taro.showToast({
            title: '上传失败，请重新上传',
            icon: 'none'
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '上传失败，请重新上传',
          icon: 'none'
        })
      }
    })
  }
  
  openLightBox = (img) => {
    Taro.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  }
  
  getValue() {
    return this.state.imgUrlVal
  }  
  
  render() {
    return (
      <View class="upload-box">
        <View class="upload-content">
          <Image class="upload-image" src={this.state.imgUrl}/>
          <View class="upload-btn" onClick={this.uploadFile}>
            <View class="iconfont iconjiahao"></View>
          </View>
        </View>
      </View>
    )
  }
}

export default UploadFile
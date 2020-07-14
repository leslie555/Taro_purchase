import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import './index.scss'

class CustomTabBar extends Taro.Component {

  constructor () {
    super()
    this.tabs = [
      {
        pagePath: '/pages/index/index',
        title: '首页',
        image: '/assets/images/icon_component.png',
        selectedImage: '/assets/images/icon_component_HL.png',
      }, {
        pagePath: '/pages/order/index',
        title: '工单',
        image: '/assets/images/icon_component.png',
        selectedImage: '/assets/images/icon_component_HL.png',
      }, {
        pagePath: '/pages/message/index',
        title: '消息',
        image: '/assets/images/icon_component.png',
        selectedImage: '/assets/images/icon_component_HL.png',
      }, {
        pagePath: '/pages/mine/index',
        title: '我的',
        image: '/assets/images/icon_component.png',
        selectedImage: '/assets/images/icon_component_HL.png',
      }
    ]
  }

  state = {
    current: 0
  }

  componentDidShow () {
    Taro.hideTabBar()
  }

  handleClick (value) {
    console.log(value)
    this.setState({
      current: value
    })
    let url = this.tabs[value].pagePath
    Taro.switchTab({
      url: url,
    })
  }

  render () {
    const { current } = this.state
    return <AtTabBar color='#7A7E83' selectedColor='#1AAD19' tabList={this.tabs} current={current}
      onClick={(index) => this.handleClick(index)}
    />
  }
}

export default CustomTabBar

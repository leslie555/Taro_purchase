import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/order/index',
      'pages/index/index',
      'pages/message/index',
      'pages/mine/index',
      'pages/ListDemo/index',
      'pages/UploadImage/index',
      'pages/orderDetail/index',
      'pages/orderProcess/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: false,
      color: '#7A7E83',
      selectedColor: '#3cc51f',
      borderStyle: '#000000',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/order/index',
          text: '工单',
          iconPath: 'assets/images/icon_component.png',
          selectedIconPath: 'assets/images/icon_component_HL.png',
        },
        {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/icon_component.png',
        selectedIconPath: 'assets/images/icon_component_HL.png',
      }, 
       {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: 'assets/images/icon_component.png',
        selectedIconPath: 'assets/images/icon_component_HL.png',
      }, {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/images/icon_component.png',
        selectedIconPath: 'assets/images/icon_component_HL.png',
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))

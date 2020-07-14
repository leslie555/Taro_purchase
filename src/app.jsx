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
      'pages/mine/index',
      'pages/order/index',
      'pages/index/index',
      'pages/message/index',
      'pages/ListDemo/index',
      'pages/UploadImage/index',
      'pages/orderDetail/index',
      'pages/orderProcess/index',
      'pages/clean/index',
      'pages/waitDo/index',
      'pages/setting/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#4189F2',
      navigationBarTitleText: '弹窝到家',
      navigationBarTextStyle: 'white',
      backgroundColor:"#F9F9F9"
    },
    tabBar: {
      custom: false,
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/icon_component.png',
        selectedIconPath: 'assets/images/icon_component_HL.png',
      }, {
        pagePath: 'pages/order/index',
        text: '工单',
        iconPath: 'assets/images/icon_component.png',
        selectedIconPath: 'assets/images/icon_component_HL.png',
      }, {
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
  componentWillMount() {
    Taro.getSystemInfo({})
    .then(res  => {
      console.log('设备信息', res)
      Taro.$navBarMarginTop =  res.statusBarHeight || 20
      Taro.$isliuhai = res.safeArea.top === 44
    })
  }
  componentDidMount () {}

  componentDidShow () {

  }

  componentDidHide () {}

  componentDidCatchError () {}



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

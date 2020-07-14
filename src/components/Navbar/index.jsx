import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

  export default class Navbar extends Taro.Component {
    constructor() {
      this.style = { paddingTop: Taro.$navBarMarginTop + 8 + 'PX', paddingBottom: Taro.$navBarMarginTop - 4 + 'PX'}
    }
  
    render() {
      
     // 将状态栏的区域空余出来
     return(
      <View className='navbarWrap' style={this.style}>
        <View className='navbar'>{this.props.title}</View>
      </View>
     )
   }
 }

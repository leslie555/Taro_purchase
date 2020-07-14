import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import './index.scss'

export default class index extends Taro.Component {

  handleItemClick = () => {
    Taro.navigateTo({
      url: '/pages/orderDetail/index'
    })
  }

  handleItemProcess = () => {
    Taro.navigateTo({
      url: '/pages/orderProcess/index'
    })
  }

  render() {
    const { item } = this.props
    const alignCenter = {textAlign: "center"}
    const alignLeft = {textAlign: "left"}
    return (
      <View className='container'  onClick={this.handleItemClick}>

        <View className='at-row at-row__align--center' style="height:40px;">
          <View className="at-col at-col-2" style={alignCenter}>维修</View>
          <View className='at-col at-col-8' style={alignLeft}>保利星座-1-2-205-A</View>
          <View className='at-col at-col-2' style={alignCenter}>＞</View>
        </View>

        <View className='at-col'>
          <View className='at-row at-row__align--center narrowRow'>
            <View className="at-col at-col-2" style={alignCenter}>图标</View>
            <View className="at-col at-col-8" style={alignLeft}>成都市高新区天府大道15号</View>
          </View>
          <View className='at-row at-row__align--center narrowRow'>
            <View className="at-col at-col-2" style={alignCenter}>图标</View>
            <View className="at-col at-col-3" style={alignLeft}>2019-06-09</View>
            <View className="at-col at-col-5" style={alignLeft}>15:32</View>
            <View className="at-col at-col-2 btn-container" onClick={this.handleItemProcess}>
              <View className='handle'>处理</View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '工单'
  }
  
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  handleItemClick = () => {
    Taro.navigateTo({
      url: '/pages/orderDetail/index'
    })
  }

  handleItemProcess = () => {
    console.log('dd')
    Taro.navigateTo({
      url: '/pages/orderProcess/index'
    })
  }

  render () {
    const { current } = this.state
    const tabList = [{ title: '待处理' }, { title: '已完成' }]
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={current} index={0} >
          <ScrollView>
          <View style='text-align: center'>
            <View style='height:100px; background-color: #ccc;margin-bottom: 12px'  onClick={this.handleItemClick}>

                <View className='at-row at-row__align--center' style="height:40px;">
                  <View className="at-col at-col-2" >维修</View>
                  <View className='at-col at-col-8' style="text-align: left">保利星座-1-2-205-A</View>
                  <View className='at-col at-col-2' style="text-align: center;">＞</View>
                </View>

                <View className='at-col'>
                  <View className='at-row at-row__align--center' style="height:30px;font-size: 14px">
                    <View className="at-col at-col-2" style="text-align:center">图标</View>
                    <View className="at-col at-col-8" style="text-align:left">成都市高新区天府大道15号</View>
                  </View>
                  <View className='at-row at-row__align--center' style="height:30px; font-size: 14px">
                    <View className="at-col at-col-2">图标</View>
                    <View className="at-col at-col-3" style="text-align:left">2019-06-09</View>
                    <View className="at-col at-col-5" style="text-align:left">15:32</View>
                    <View className="at-col at-col-2" style="margin-left: -12px;padding:0 6px" onClick={this.handleItemProcess}>
                      <View style="background:#49f;border-radius: 6px;color: white;font-size: 16px">处理</View>
                    </View>
                  </View>
                </View>

            </View>


            <View style='height:100px; background-color: #ccc;margin-bottom: 12px' className='at-row'>
              <View className='at-row'>
                <View className="at-col at-col-2" style="background: red">维修</View>
                <View className='at-col at-col-8' style="background: orange">保利星座-1-2-205-A</View>
                <View className='at-col at-col-2' style="background: pink">＞</View>
              </View>
            </View>
            <View style='height:100px; background-color: #ccc;margin-bottom: 12px' className='at-row'>C</View>
          </View>
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>已完成</View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}
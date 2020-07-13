import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'

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
          <View style='text-align: center' className='at-col' >
            <View style='height:100px; background-color: #ccc;margin: 12px' className='at-row' onClick={this.handleItemClick}>
              <View>
                <View>
                  <Text className="type">维修</Text>
                  <Text>保利星座-1-2-205-A</Text>
                  <Text>＞</Text>
                </View>
                <View>
                  <View>
                    <Text>成都市高新区</Text>
                  </View>
                  <View>
                    <Text>2-19-06-09</Text>
                    <Text>15:32</Text>
                    <AtButton size='small' type='primary' lang='zh_CN' customStyle="width:50px;font-size:12px;height:24px;padding-top:-6px" onClick={this.handleItemProcess}>处理</AtButton>
                  </View>
                </View>
              </View>
            </View>

            <View style='height:100px; background-color: #ccc;margin: 12px' className='at-row'>B</View>
            <View style='height:100px; background-color: #ccc;margin: 12px' className='at-row'>C</View>
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
import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'

export default class OrderDetail extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  render() {
    return <View>111</View>
  }
}
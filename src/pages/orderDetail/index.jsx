import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'

export default class OrderDetail extends Taro.Component {
  config = {
    navigationBarTitleText: '详情'
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  render() {
    return (
      <ScrollView>
        <AtList>
          <AtListItem title='房源名称' onClick={this.handleClick} />
          <AtListItem title='地址' arrow='right' />
          <AtListItem title='租客' extraText='详细信息' />
          <AtListItem title='业务员' disabled extraText='详细信息' />
          <AtListItem title='部门' arrow='right' />
          <AtListItem title='提交时间' extraText='详细信息' />
          <AtListItem title='状态' disabled extraText='详细信息' />
          <Text>搬家内容</Text>
          <AtTextarea
            count={false}
            value={`333`}
            // onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='你的问题是...'
            disabled
          />
          <Text>备注</Text>
          <AtTextarea
            count={false}
            value={`333`}
            // onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='你的问题是...'
            disabled
          />
          <Text>搬家信息</Text>
          <AtListItem title='搬家人员' arrow='right' />
          <AtListItem title='完成时间' extraText='详细信息' />
          <AtTextarea
            count={false}
            value={`搬家备注`}
            // onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='你的问题是...'
            disabled
          />
        </AtList>
      
      </ScrollView>
    )
  }
}
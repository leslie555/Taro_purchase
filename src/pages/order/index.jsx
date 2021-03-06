import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import ListItem from '../../components/ListItem/index'
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

  render () {
    const { current } = this.state
    const tabList = [{ title: '待处理' }, { title: '已完成' }]
    const renderItemFn = ({item}) => (
      <ListItem item={item} />
    )
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={current} index={0} >
          <ScrollView className='scroll-container'>
            <ListItem />
            <ListItem />
            <ListItem />
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>已完成</View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}
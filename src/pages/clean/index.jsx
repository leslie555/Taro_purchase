import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import ListItem from '../../components/ListItem/index'
import '../order/index.scss'

export default class Index extends Taro.Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      data: {}
    }
  }
  componentWillMount() {
    
  }
  componentDidShow() {
    const { type } = this.$router.params
    let title
    if (type === '1') {
      title = '装修'
    } else if (type === '2') {
      title = '维修'
    } else if (type === '3') {
      title = '保洁'
    } else {
      title = '搬家'
    }
    Taro.setNavigationBarTitle({ title })
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
          <ScrollView  className='scroll-container'>
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
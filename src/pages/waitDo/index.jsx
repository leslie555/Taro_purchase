import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import ListItem from '../../components/ListItem/index'
import '../order/index.scss'

export default class Index extends Taro.Component {

  config = {
    navigationBarTitleText: ''
  }
  constructor () {
    super(...arguments)
    this.state = {
      data: '',
      date: ''
    }
  }
  // componentWillMount() {
    
  // }
  componentWillMount() {
    const { date, type } = this.$router.params
    if (type === '3') {
      const timeStr = new Date(new Date().getTime() + date * 3600 * 24 * 1000).toLocaleString('chinese',{hour12:false})
      const dateStr = timeStr.split(' ')[0]
      this.setState({date: dateStr})
      Taro.setNavigationBarTitle({ title: '待上门' })
    } else if (type === '1') {
      Taro.setNavigationBarTitle({ title: '待处理' })
    } else {
      Taro.setNavigationBarTitle({ title: '已完成' })
    }
    
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const { date } = this.state
    const renderItemFn = ({item}) => (
      <ListItem item={item} />
    )
    return (
      <ScrollView  className='scroll-container'>
        {date &&<View className='date'>{date}</View>}
        <ListItem />
        <ListItem />
        <ListItem />
      </ScrollView>
    )
  }
}
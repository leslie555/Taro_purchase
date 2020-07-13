import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ShowDecorationSheetList } from '@/api/contract'
import './index.scss'
import { AtTabBar } from 'taro-ui'

class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loading: true,
    threads: [],
    current: 0,
    tabs: [
      { title: '首页' },
      { title: '工单' },
      { title: '消息' },
      { title: '我的' }
    ]
  }

  async componentDidMount () {
    try {
      const postData = {
        DepID: '',
        FullIDNew: '',
        HouseName: '',
        Salesman: '',
        SheetStatus: '',
        parm: {
          size: 10,
          page: 1
        }
      }
      const res = await ShowDecorationSheetList(postData)
      this.setState({
        threads: res.Data && res.Data.rows || [],
        loading: false
      })
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }

  handleNavigate = () => {
    Taro.navigateTo({
      url: '/pages/UploadImage/index'
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    },()=>{
      wx.switchTab("/pages/message/index")
    })
  }

  render () {
    const { loading, threads, current,tabs } = this.state
    return (
      <View className='at-col' >
        <Text onClick={this.handleNavigate}>消息列表</Text>
      </View>
    )
  }
}

export default Index

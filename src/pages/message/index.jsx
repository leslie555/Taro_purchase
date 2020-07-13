import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ShowDecorationSheetList } from '@/api/contract'
import './index.scss'

class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loading: true,
    threads: [],
  }

  async componentDidMount () {

  }

  render () {
    const { } = this.state
    return (
      <View className='at-col' >
        <Text onClick={this.handleNavigate}>消息列表</Text>
      </View>
    )
  }
}

export default Index

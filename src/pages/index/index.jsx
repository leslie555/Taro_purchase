import Taro from '@tarojs/taro'
import { View, Text ,NavigationBar} from '@tarojs/components'
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

  handleNavigate = () => {
    Taro.navigateTo({
      url: '/pages/UploadImage/index'
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    },()=>{
      Taro.switchTab({
        url: '/pages/message/index'
      })
    })
  }

  render () {
    const { loading, threads, current,tabs } = this.state
    return (
      <View className='at-col' >
      aaa
      </View>
    )
  }
}

export default Index

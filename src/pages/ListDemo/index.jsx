import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { List, EmptyList, UploadFile } from '@/components'
import { ShowDecorationSheetList } from '@/api/contract'

// import './index.scss'

class ListDemo extends Taro.Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loading: true,
    threads: []
  }

  async componentDidMount () {
    try {
      const postData = {
        DepID: "",
        FullIDNew: "",
        HouseName: "",
        Salesman: "",
        SheetStatus: "",
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

  render () {
    const { loading, threads } = this.state
    return (
      <View>
        <Text>1</Text>
      </View>
    )
  }
}

export default ListDemo
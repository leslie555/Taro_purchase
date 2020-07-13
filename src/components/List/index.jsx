import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { ListItem } from './ListItem'
// import { Loading } from './loading'

// import './thread.css'

class List extends Taro.Component {
  static defaultProps = {
    threads: [],
    loading: true
  }

  render () {
    const { loading, threads } = this.props

    // if (loading) {
    //   return <Loading />
    // }

    const element = threads.map((thread, index) => {
      return (
        <ListItem key={index + ''}>
          {thread.HouseName}
          </ListItem>
      )
    })

    return (
      <View className='thread-list'>
        {element}
      </View>
    )
  }
}

export default List
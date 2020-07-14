import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

class Index extends Taro.Component {

  state = {}

  async componentDidMount () {

  }

  config = {
    navigationBarTitleText: '首页'
  }

  handleGoPage = () => {
    Taro.navigateTo({
      url: `/pages/clean/index?type=3`
    })
  }

  render () {
    const {} = this.state
    return (
      <View className='at-col'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          autoplay
        >
          <SwiperItem>
            <Image src={require('../../assets/images/index_banner.png')}
              mode='widthFix'
              style='width:100%;'
            />
          </SwiperItem>
        </Swiper>
        <View className='at-row container'>
          <View className='at-col item'>
            <Image src={require('../../assets/images/index_bg01.png')}
              mode='widthFix'
              style='width:100%;'
            />
            <View className='content'>
              <View className='count'>185</View>
              <View className='title'>装修</View>
              <View className='tips'>用我奔放情，饰你智慧心</View>
            </View>
          </View>
          <View className='at-col item'>
            <Image src={require('../../assets/images/index_bg02.png')}
              mode='widthFix'
              style='width:100%;'
            />
            <View className='content'>
              <View className='count'>185</View>
              <View className='title'>维修</View>
              <View className='tips'>维修大联盟，服务千万家</View>
            </View>
          </View>
        </View>
        <View className='at-row container'>
          <View className='at-col item'  onClick={() => this.handleGoPage()}>
            <Image src={require('../../assets/images/index_bg03.png')}
              mode='widthFix'
              style='width:100%;'
            />
            <View className='content'>
              <View className='count'>185</View>
              <View className='title'>保洁</View>
              <View className='tips'>平台一发，保洁到家</View>
            </View>
          </View>
          <View className='at-col item'>
            <Image src={require('../../assets/images/index_bg04.png')}
              mode='widthFix'
              style='width:100%;'
            />
            <View className='content'>
              <View className='count'>185</View>
              <View className='title'>搬家</View>
              <View className='tips'>搬起幸福，安个新家</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index

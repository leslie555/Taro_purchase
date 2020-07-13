import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import namedPng from '@/assets/images/EmptyList/nomsg.png'
import './index.scss'

export default function EmptyList() {
  return (
    <View class="no-msg">
      <Image src={namedPng} class="img"/>
    </View>
  )
}


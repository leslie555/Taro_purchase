import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { ShowDecorationSheetList } from '@/api/contract'
import './index.scss'
import NavBar from '../../components/Navbar/index'

// type 0 1 2 代表号数 月份 星期
export function calcDate (num, type=0) {
  const myDate = new Date(new Date().getTime() + num * 3600 * 24 *1000)
  if (type === 1)  return myDate.getMonth() + 1
  if (type === 2) return myDate.getDay()
  return myDate.getDate()
}

const weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

class Index extends Taro.Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3888FE',
    navigationBarTextStyle: 'white',
    // usingComponents: {
    //   'navbar': '../../components/Navbar/index', // 书写第三方组件的相对路径
    // },
  }

  constructor(props) {
    super(props)
    this.setStyle = {top: Taro.$isliuhai ? '52PX' : '28PX'}
    this.state = {
      loading: true,
    }
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
  handleSetting = () => {
    Taro.navigateTo({
      url: `/pages/setting/index`
    })
  }
  
  handleClick = (type, date) => {
    if (type === 3) {
      Taro.navigateTo({
        url: `/pages/waitDo/index?type=3&date=${date}`
      })
    } else if (type === 1) {
      Taro.navigateTo({
        url: `/pages/waitDo/index?type=1`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/waitDo/index?type=2`
      })
    }
   
  }

  render () {
    const { loading } = this.state
    const cellRow = {borderTop: '1px solid rgba(200,200,200,0.2)', backgroundColor: '#fff', }
    const today = {color: '#3888FE'}
    return (
      <View className='container'>
        <NavBar title='我的'/>
        <View className='setting-area' onClick={this.handleSetting} style={this.setStyle}>
          <Image src={require('../../assets/images/setting.png')}
            mode='widthFix'
            className='setting'
          />
        </View>
        <View className='after-nav'></View>

        <View className='total-show'>
          <View className='split-line isDone' onClick={() => this.handleClick(1)}>
            <Image src={require('../../assets/images/waitDo.png')}
              mode='widthFix'
              className='isDonePic'
            />
            <View>
              <View className='num'>2</View>
              <View className='type'>待处理</View>
            </View>
          </View>

          <View className='isDone' onClick={() => this.handleClick(2)}>
            <Image src={require('../../assets/images/hadDone.png')}
              mode='widthFix'
              className='isDonePic'
            />
            <View>
              <View className='num'>99+</View>
              <View className='type'>已完成</View>
            </View>
           
          </View>
        </View>

        <View className='task9-title'>
          <Image src={require('../../assets/images/nineDayToDo.png')}
            mode='widthFix'
            className='todo-9'
          />
          <View>近9天待上门任务</View>
        </View>

        <View className='at-col all-cell'>

          <View className='at-row cell-row' style={cellRow}>

            <View className='at-col at-col-4' onClick={() => this.handleClick(3, 0)}>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' style={today}>{weekArr[calcDate(0, 2)]}</View>
                <View className='at-col at-col-6' style={today}>{calcDate(0, 1)}/{calcDate(0)}</View>
              </View>
              <View className='cell-num' style='text-decoration: underline #3888FE'>3</View>
            </View>

            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(1, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(1, 1)}/{calcDate(1)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(2, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(2, 1)}/{calcDate(2)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
          </View>

          <View className='at-row cell-row' style={cellRow}>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(3, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(3, 1)}/{calcDate(3)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(4, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(4, 1)}/{calcDate(4)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(5, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(5, 1)}/{calcDate(5)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
          </View>

          <View className='at-row cell-row last-row' style={cellRow}>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(6, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(6, 1)}/{calcDate(6)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(7, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(7, 1)}/{calcDate(7)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
            <View className='at-col at-col-4'>
              <View className='at-row at-row__justify--between'>
                <View className='at-col at-col-6' >{weekArr[calcDate(8, 2)]}</View>
                <View className='at-col at-col-6' >{calcDate(8, 1)}/{calcDate(8)}</View>
              </View>
              <View className='cell-num'>3</View>
            </View>
          </View>
         
        </View>
      </View>
    )
  }
}

export default Index

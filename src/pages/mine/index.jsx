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
    const { loading, threads, current,tabs } = this.state
    // const afterNavbar = {height: '4vh', marginTop: Taro.$navBarMarginTop * 2 + 4 + 'PX'}
    const afterNavbar = {height: '3vh'}
    const cellRow = {borderTop: '1px solid rgba(200,200,200,0.2)',height:'16vh', backgroundColor: '#fff', }
    const today = {color: '#3888FE'}
    const weekArr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return (
      <View className='container'>
        <NavBar title='我的'/>
        <Image src={require('../../assets/images/setting.png')}
          mode='widthFix'
          className='setting'
          onClick={this.handleSetting}
        />
        <View style={afterNavbar}></View>

        <View className='at-row at-row__justify--around total-show'>
          <View className='at-col at-col-6 split-line' onClick={() => this.handleClick(1)}>
            <View className='num'>2</View>
            <View className='type'>待处理</View>
          </View>
          <View className='at-col at-col-6' onClick={() => this.handleClick(2)}>
            <View className='num'>99+</View>
            <View className='type'>已完成</View>
          </View>
        </View>
        <View className='at-row at-row__align--center task9'>
          <View className='at-col at-col-12'>
            <View>近9天待上门任务</View>
          </View>
        </View>

        <View className='at-col'>

          <View className='at-row left-line' style={cellRow}>
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

          <View className='at-row left-line' style={cellRow}>
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

          <View className='at-row left-line last-row' style={cellRow}>
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

/*
 *  taro.request 模拟 axios
 * */

import { baseURL } from '@/config'
import storage from '@/utils/storage'
import store from '@/store'
import Taro from '@tarojs/taro'

const timeout = 100000

const request = function(options) {
  return new Promise((resolve, reject) => {
    requestDefend(options, resolve, reject)
  })
}

// 新增登录守卫  登录过期递归调用重新登录
const requestDefend = function (options, resolve, reject, defendType = 0) {
  storage.get('token').then((token) => {
    if (options.url.indexOf('http') === -1) {
      options.url = baseURL + options.url
    }
    if (defendType === 0) {
      options.url += `?Token=${token || '666'}`
    } else {
      options.url = options.url.split('?')[0] + `?Token=${token || '666'}`
    }
    options.method = options.method.toUpperCase()
    options.header = {
      Accept: `application/json`,
      'Content-Type': 'application/json;charset=UTF-8'
    }
    options.success = ({ data, statusCode }) => {
      if (data.Code === 0) {
        return resolve(data)
      } else if (data.Code === 2) {
        Taro.hideLoading()
        // 自动重新登录一次
        const openID = storage.get('openid')
        if (typeof openID === 'string' && defendType < 2) {
          store.dispatch('Login', openID).then(data => {
            requestDefend(options, resolve, reject, ++defendType)
          }).catch(() => {
            Taro.reLaunch({ url: 'pages/index/index' })
          })
        } else {
          Taro.showToast({
            title: '登录过期',
            icon: 'none'
          })
          Taro.reLaunch({ url: 'pages/index/index' })
          return reject(new Error('登录过期'))
        }
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: data.Msg || '网络异常，请稍后再试',
          icon: 'none'
        })
        return reject(new Error(data.Msg))
      }
    }
    options.fail = err => {
      Taro.hideLoading()
      Taro.showToast({
        title: '请求失败,请检查网络!',
        icon: 'none'
      })
      return reject(err)
    }
    Taro.request(options)
  }) 
}

const timeoutRequest = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, timeout)
  })
}
export default function(options) {
  return new Promise((resolve, reject) => {
    Promise.race([request(options), timeoutRequest()]).then(
      res => {
        return resolve(res)
      },
      err => {
        if (err && err.message === 'timeout') {
          Taro.hideLoading()
          Taro.showToast({
            title: '请求超时,请检查网络!',
            icon: 'none'
          })
        } else {
          //
        }
        return reject(err || {})
      }
    )
  })
}

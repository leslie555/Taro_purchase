/**
 * @file: index.
 * @intro: 时间格式化工具类.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/4/28 15:55.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

/**
 * 时间格式化函数
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * @param {Date||number} date Date对象或者时间戳
 * @param {string} fmt 格式化字符串
 *        ("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *        ("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @returns {string} 格式化后的字符串
 */
const dateFormat = (date, fmt) => {
  // 如果是时间戳的话那么转换成Date类型
  if (typeof date === 'number') {
    date = new Date(date)
  } else if (typeof date === 'string') {
    if (date === '0001-01-01T00:00:00') {
      return ''
    }
    date = new Date(date.replace('T', ' ').replace(/-/g, '/'))
  } else if (!date) {
    return ''
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd'
  }
  const o = {
    // 月份
    'M+': date.getMonth() + 1,
    // 日
    'd+': date.getDate(),
    // 小时
    'h+': date.getHours(),
    // 分
    'm+': date.getMinutes(),
    // 秒
    's+': date.getSeconds(),
    // 季度
    'q+': Math.floor((date.getMonth() + 3) / 3),
    // 毫秒
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// 计算2个时间相差的年月
const diffTime = (time1, time2, type = 0) => {
  time1 = dateFormat(time1, 'yyyy-MM-dd')
  time2 = dateFormat(time2, 'yyyy-MM-dd')
  if (!time1 || !time2) {
    return ''
  }
  const time1Arr = time1.split('-')
  const time2Arr = time2.split('-')
  let diffMonth = Math.abs(
    (time2Arr[0] - time1Arr[0]) * 12 + (time2Arr[1] - time1Arr[1])
  )
  const time2Obj = new Date(time2)
  time2Obj.setDate(time2Obj.getDate() + 1)
  if (+time1Arr[2] === 1 && time2Obj.getDate() === 1) {
    diffMonth += 1
  }
  const time1Obj = new Date(time1)
  time1Obj.addMonths(diffMonth)
  let str = ''
  const strArr = ['', '', '']
  // 表示整年整月
  if (diffMonth >= 12) {
    if (diffMonth % 12 === 0) {
      str = `${diffMonth / 12}年`
      strArr[0] = diffMonth / 12
      strArr[1] = ''
      strArr[2] = ''
    } else {
      str = `${Math.floor(diffMonth / 12)}年${diffMonth % 12}个月`
      strArr[0] = Math.floor(diffMonth / 12)
      strArr[1] = diffMonth % 12
      strArr[2] = ''
    }
  } else if (diffMonth > 0) {
    str = `${diffMonth}个月`
    strArr[0] = ''
    strArr[1] = diffMonth
    strArr[2] = ''
  } else {
    strArr[0] = ''
    strArr[1] = ''
    strArr[2] = ''
  }
  if (time1Obj.getTime() === time2Obj.getTime()) {
    // return str
    console.log(time2Arr)
  } else {
    const diffDate = time2Arr[2] - time1Arr[2] + 1
    if (diffDate < 0) {
      diffMonth -= 1
      const time1ObjClone = new Date(time1)
      time1ObjClone.addMonths(diffMonth)
      if (diffMonth >= 12) {
        if (diffMonth % 12 === 0) {
          str = `${diffMonth / 12}年`
          strArr[0] = diffMonth / 12
          strArr[1] = ''
          strArr[2] = ''
        } else {
          str = `${Math.floor(diffMonth / 12)}年${diffMonth % 12}个月`
          strArr[0] = Math.floor(diffMonth / 12)
          strArr[1] = diffMonth % 12
          strArr[2] = ''
        }
      } else if (diffMonth > 0) {
        str = `${diffMonth}个月`
        strArr[0] = ''
        strArr[1] = diffMonth
        strArr[2] = ''
      } else {
        strArr[0] = ''
        strArr[1] = ''
        strArr[2] = ''
      }
      const calcTime =
        (time2Obj.getTime() - time1ObjClone.getTime()) / 3600000 / 24
      str += calcTime + '天'
      strArr[2] = calcTime
    } else {
      str += diffDate + '天'
      strArr[2] = diffDate
    }
  }
  return type === 0 ? str : strArr
}

export { dateFormat, diffTime }

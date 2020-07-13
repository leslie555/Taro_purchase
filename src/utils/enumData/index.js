/* eslint-disable eqeqeq */
import storage from '../storage'
import deepCopy from '../arrUtil/deepClone'

export default {
  // 根据枚举key获取枚举类型列表
  getEnumListByKey(key) {
    const allEnum = storage.get('enumList')
    const obj = allEnum['Enum' + key] || []
    return deepCopy(obj)
  },
  // 根据枚举key 和 value获取name
  getEnumDesByValue(key, val) {
    const list = this.getEnumListByKey(key)
    const data = list.find(v => v.Value == val)
    return data ? data.Description : null
  },
  // 根据枚举key 和 name获取value
  getEnumValueByDes(key, des) {
    const list = this.getEnumListByKey(key)
    const data = list.find(v => v.Description == des)
    return data ? data.Value : null
  }
}

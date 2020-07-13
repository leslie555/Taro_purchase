export function validate(obj, keys) {
  if (!keys) {
    for (const key in obj) {
      const item = obj[key]
      if (item === '' || item === undefined || item === []) {
        wx.showToast({
          title: '请检查表单信息是否填写正确',
          icon: 'none'
        })
        return false
      }
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      const item = obj[keys[i]]
      if (item === '' || item === undefined || item === []) {
        wx.showToast({
          title: '请检查表单信息是否填写正确',
          icon: 'none'
        })
        return false
      }
    }
  }
  return true
}

// 验证电话号码格式
export const validatePhoneNumber = function(val) {
  if (!val) return true
  const reg = /^1[3-9]\d{9}$/
  return reg.test(val)
}

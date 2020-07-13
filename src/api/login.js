import request from '@/utils/request'
export function login(username, password) {
  return request({
    url: '/SystemMethod/Login',
    method: 'post',
    data: {
      LoginCode: username,
      LoginPwd: password
    }
  })
}

export function logout(data) {
  return request({
    url: '/SystemMethod/ExitLogin',
    method: 'post',
    data
  })
}

export function getAllEnumData(data = {}) {
  return request({
    url: '/System/SystemMethod/GetEnums',
    method: 'post',
    data
  })
}

export function TenantRegister(data = {}) {
  return request({
    url: '/Individual/TenantSideApplet/TenantRegister',
    method: 'post',
    data
  })
}

// 散客登录/*
export function TenantLogin(data = {}) {
  return request({
    url: '/Individual/TenantSideApplet/TenantLogin',
    method: 'post',
    data
  })
}

// 验证码/*
export function SendMessge(data = {}) {
  return request({
    url: '/SystemMethod/SendMessge',
    method: 'post',
    data
  })
}
// 校验验证码/*
export function GetShortmessageByID(data = {}) {
  return request({
    url: '/SystemMethod/GetShortmessageByID',
    method: 'post',
    data
  })
}

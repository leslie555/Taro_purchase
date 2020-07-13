import request from '@/utils/request'

// 获取租客合同列表
export function AppletsTenantList(data) {
  return request({
    url: '/Applets/AppletsTenantList',
    method: 'post',
    data
  })
}

// 预览合同详情
export function findTenantPreviewById(data) {
  return request({
    url: '/Applets/AppTenantPreview',
    method: 'post',
    data
  })
}

// 签字个人认证
export function personAuth(data) {
  return request({
    url: '/FDD/FDD/Register',
    method: 'post',
    data
  })
}

//  存参数
export function AddRealNameAuthenticateNeed(data) {
  return request({
    url: '/FDD/FDD/AddRealNameAuthenticateNeed',
    method: 'post',
    data
  })
}

// 下载模板
export function getDownloadContract(data) {
  return request({
    url: '/FDD/FDD/DownLoadContract',
    method: 'post',
    data
  })
}

// 预览模板
export function onlyViewContract(data) {
  return request({
    url: '/FDD/FDD/ViewContract',
    method: 'post',
    data
  })
}

// 装修单
export function ShowDecorationSheetList(data) {
  return request({
    url: '/CompanyMethod/ShowDecorationSheet',
    method: 'post',
    data
  })
}

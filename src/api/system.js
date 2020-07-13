import request from '@/utils/request'

// 阿里云签字接口
export function MakeAutograph(data) {
  return request({
    url: '/SystemMethod/MakeAutograph',
    method: 'post',
    data
  })
}

// 图片保存
export function imageUpDirect(data) {
  return request({
    url: '/SystemMethod/imageUpDirect',
    method: 'post',
    data
  })
}
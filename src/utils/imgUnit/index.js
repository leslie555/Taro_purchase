import { baseImgURL } from '../../config'

const getThumbImgUrl = function(url = '', options = { w: 200 }) {
  url = getImgUrl(url)
  if (url.indexOf('x-oss-process=image')) {
    url = url.split('?')[0]
  }
  url += '?x-oss-process=image/resize,w_' + options.w
  return url
}
const getImgUrl = function(url = '') {
  if (!url) {
    url = '/funrenting/636825557579590566'
  }
  if (url.indexOf('blob:') === 0) {
    return url
  } else if (url.indexOf('http') === 0) {
    return url
  } else {
    return baseImgURL + url
  }
}
export {
  getImgUrl,
  getThumbImgUrl
}

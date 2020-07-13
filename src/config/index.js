/**
 * 内网测试服务器
 */
const baseURL = `http://192.168.2.177:1917`
const phoneURL = `http://192.168.2.177:7776/phone/#/`
const gwUrl = `http://192.168.2.31:8077`
const pdfDownloadUrl = `http://192.168.2.31:8077`

/**
 * 外网测试服务器
 */
// const baseURL = `http://39.98.174.129:1921`
// const gwUrl = `http://192.168.2.31:8078`
// const phoneURL = `http://39.98.174.129:1926/phone/#/`
// const pdfDownloadUrl = `http://192.168.2.31:8078`

/**
 * 正式服务器
 */
// const baseURL = `https://servers.51tanwo.com/`
// const phoneURL = `https://www.51tanwo.com/phone?v=1078/#/`

const baseImgURL = `https://newfunrenting.oss-cn-zhangjiakou.aliyuncs.com`
const webpageUrl = `http://h5.51tanwo.com/#/`
const payURL = `https://h6.51tanwo.com`
const storage_prefix = 'tgf_'
export { baseURL, storage_prefix, baseImgURL, phoneURL, webpageUrl, pdfDownloadUrl, gwUrl, payURL }

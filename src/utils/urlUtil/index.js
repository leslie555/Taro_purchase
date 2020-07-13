const toParam = function(obj) {
  var param = ''
  for (const name in obj) {
    if (typeof obj[name] !== 'function') {
      param += '&' + name + '=' + encodeURI(obj[name])
    }
  }
  return '?' + param.slice(1)
}
export { toParam }

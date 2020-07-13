function getType(obj) {
  const str = Object.prototype.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[str]
}

export default function deepCopy(p) {
  let obj
  const str = getType(p)
  if (str === 'array') {
    obj = []
    for (let i = 0; i < p.length; i++) {
      obj.push(deepCopy(p[i]))
    }
  } else if (str === 'object') {
    obj = {}
    for (const i in p) {
      obj[i] = deepCopy(p[i])
    }
  } else {
    return p
  }
  return obj
}

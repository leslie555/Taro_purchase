/* eslint-disable no-global-assign,no-extend-native */
// 重新定义Date函数

/**
 * 在Safari和IE8上执行 new Date('2017-12-8 11:36:45'); 会得到Invalid Date
 * 本函数重写默认的Date函数，以解决其在Safari，IE8上的bug
 */
// 新增addMonth方法
Date.isLeapYear = function(year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
}

Date.getDaysInMonth = function(year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}

Date.prototype.isLeapYear = function() {
  return Date.isLeapYear(this.getFullYear())
}

Date.prototype.getDaysInMonth = function() {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
}

Date.prototype.addMonths = function(value) {
  var n = this.getDate()
  this.setDate(1)
  this.setMonth(this.getMonth() + value)
  this.setDate(Math.min(n, this.getDaysInMonth()))
  return this
}

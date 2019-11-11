// 云函数入口文件
var rq = require('request-promise')
// 云函数入口函数
exports.main = (event, context) => {
  console.log(event)
  var res = rq('http://localhost:8080/xcx/index')
  return res
  console.log(res)
}
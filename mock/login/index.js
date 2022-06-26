/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-15 16:04:03
 * @LastEditors: BG
 * @LastEditTime: 2022-06-15 17:21:59
 */

function response(req) {
  // req.query  获得请求得到的参数
  console.log(req.query)
  return {
    'a': 'c'
  }
}

module.exports = {
  methods: 'get',
  response
}

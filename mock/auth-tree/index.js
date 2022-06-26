/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-15 17:38:26
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 17:11:45
 */
const path = require('path')
const { getAllFiles } = require('../helper')

const jsonList = getAllFiles(path.resolve(__dirname, '../../src/router/json'), ['.json']).map(v => v.data)

function response(req) {
  // req.query  获得请求得到的参数
  // const { type } = req.query
  const result = []
  jsonList.forEach(v => result.push(v))
  return result
}

module.exports = {
  methods: 'post',
  response
}

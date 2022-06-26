/*
 * @Descripttion: 开发环境 mock
 * @version:
 * @Author: BG
 * @Date: 2022-06-15 10:17:58
 * @LastEditors: BG
 * @LastEditTime: 2022-06-15 17:17:24
 */

const { resObjCode, getAllFiles } = require('./helper')

const whiteList = ['/index', '/helper']
const urlList = getAllFiles(__dirname, ['.js']).map(i => {
  i.path = i.path.replace(__dirname, '').replaceAll('\\', '/')
  return i
}).filter(item => whiteList.find(i => item.path !== i))

exports.setupDevMockServer = function(app) {
  urlList.forEach(oUrl => {
    if (oUrl.ext === '.json') {
      app.get('/mock' + oUrl.path, function(rep, res) {
        try {
          resObjCode.data = oUrl.data
          res.json(resObjCode)
        } catch (e) {
          console.error(e)
        }
      })
    } else {
      const methods = oUrl.data.methods || 'get'
      const isFun = typeof oUrl.data === 'function'

      if (isFun || oUrl.data.response) {
        const requestFun = isFun ? oUrl.data : oUrl.data.response
        app[methods]('/mock' + oUrl.path, function(rep, res) {
          try {
            resObjCode.data = requestFun(rep)
            // resObjCode.data = mock.mock(requestFun(rep))   如果要使用mock,请安装
            res.json(resObjCode)
          } catch (e) {
            console.error(e)
          }
        })
      } else {
        console.error("Directly expose a function or configure 'response'")
      }
    }

  })
}


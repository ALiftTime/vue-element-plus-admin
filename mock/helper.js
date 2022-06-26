/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-15 10:19:00
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 17:19:24
 */
const fs = require('fs')
const path = require('path')

// result 返回模板
const resObjCode = {
  'data': '',
  'resp_code': '200',
  'resp_msg': ''
}
// 自行增加其他模板, 比如分页

function getAllFiles(dir, ext) {
  if (!dir) {
    return []
  }
  let extFiles = []

  const files = fs.readdirSync(dir)
  files.forEach(function(file) {
    const pathname = path.join(dir, file)
    const stat = fs.lstatSync(pathname)

    if (stat.isDirectory()) {
      extFiles = extFiles.concat(getAllFiles(pathname, ext))
    } else if (ext.find(i => i === path.extname(pathname)) !== -1) {
      extFiles.push({
        path: pathname.substring(0, pathname.indexOf('.')),
        allPath: pathname,
        ext: path.extname(pathname),
        data: require(pathname),
      })
    }
  })
  return extFiles
}

module.exports = {
  getAllFiles,
  resObjCode
}

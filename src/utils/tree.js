/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-09 20:56:14
 * @LastEditors: BG
 * @LastEditTime: 2022-06-11 16:02:42
 */

/**
 *
 * @param {Object} config
 * @returns  配置项
 */
const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}
const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config)
/**
 * 匹配树中的路径
 * @param {any} tree 查找的树
 * @param {Fun} func 结束条件
 * @param {object} config 配置项
 * @returns
 */
export const _TfindPath = function(
  tree,
  func,
  config = {}
) {
  config = getConfig(config)
  const path = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config

  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) { // 删除找过的值
      path.pop()
      list.shift()
    } else { // 扁平化数据到第一行,如果符合就返回
      visitedSet.add(node)
      node[children] && list.unshift(...node[children])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

/**
 * 过滤出树中所有符合条件的树
 * 功能很轻量
 * @param {*} tree
 * @param {*} func
 * @param {*} config
 * @returns
 */
export const _Tfilter = function(
  tree,
  func,
  config = {}
) {
  config = getConfig(config)
  const children = config.children
  function listFilter(list) {
    return list
      .map(node => ({ ...node })) // 拷贝作用
      .filter(node => {
        // 会出现意外
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

export const _TtreeToList = function(
  tree,
  config = {}
) {
  config = getConfig(config)
  const children = config.children
  const result = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue
    result.splice(i + 1, 0, ...result[i][children])
  }
  return result
}

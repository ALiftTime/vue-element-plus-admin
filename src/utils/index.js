/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-08 18:34:35
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 20:00:41
 */
/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const setCssVar = (prop, val, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

/**
 * 兼容处理
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
export const findIndex = (arr, fn) => {
  if (arr.findIndex) return arr.findIndex(fn)
  let index = -1
  arr.some((item, i, ary) => {
    const ret = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

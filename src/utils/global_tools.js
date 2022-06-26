/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2021-08-12 17:08:28
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 14:50:48
 */
import {
  infoMsg,
  confirmBox,
  SetTimer,
  alertBox,
} from './message'
import CONST from '@/config/constant'
import Router from '@/router'
import busEvent from './$emit'
import { useCache } from '@/hooks/web/useCache'
import { usePageLoading } from '@/hooks/web/usePageLoading'
const { loadStart, loadDone } = usePageLoading()

const timer = new SetTimer()
const { lsCache } = useCache()

/**
 * 全局唯一定时器
 * @param {Function} success 回调函数
 * @param {*} delayTime 时间
 */
function setTimer(success, delayTime) {
  timer.install(delayTime)
  timer.start(success)
}
/**
 * localStorage 存储
 */
function getStorage(type) {
  if (type && checkCONST(type)) {
    return lsCache.get(CONST[type]) || ''
  } else {
    return ''
  }
}
function setStorage(type, str) {
  if (type && checkCONST(type)) {
    return lsCache.set(CONST[type], str)
  } else {
    return ''
  }
}
function removeStorage(type) {
  return lsCache.delete(CONST[type])
}
function checkCONST(key) {
  if (!CONST[key]) console.error('常量必须在 config/constant 文件中声明')
  return CONST[key]
}
/**
 *
 * @param {String} router 跳转页面地址
 */
function jump(router) {
  Router.push(router)
}
/**
 * 交互
 */
function showMsg(msg, type, offset) {
  setTimer(() => {
    infoMsg(msg, type, offset)
  }, 100)
}
/**
 * 分页业务代码
 * @param {Object} pageInfo  分页信息
 * @param {Array} oldList  分页旧数据
 * @param {data} newList  分页新数据
 * @returns newList 和 pageInfo对象
 * pageInfo: {
      pageSize: 10,
      totalPage: 1,
      currPage: 1,
      loading: false,
      finished: false
    }
 */

function handlePage(pageInfo, oldList = [], newList) {
  const resList = newList.records // 新列表的数据
  const _currPage = newList.current // 新列表的当前页数
  const _totalPage = newList.pages // 新列表的页数
  // oldList
  if (_currPage === 1) oldList = resList
  // 如果新列表的当前页数等于1   旧列表等于新列表的数据
  else if (_currPage <= _totalPage) oldList = oldList.concat(resList)
  // 否则新列表的当前页数<=新列表的页数    旧列表==旧列表拼接后的新列表数据
  if (_currPage === _totalPage || _totalPage === 0) pageInfo.finished = true
  // 如果新列表的当前页数=新列表的页数  或者新列表的页数=0   那么传进来的这个完成变成true
  pageInfo.currPage = _currPage // 传进来的当前页=新列表的当前页数
  pageInfo.totalPage = _totalPage // 传进来的总页=新列表的页面
  pageInfo.loading = false // 传进来的加载=false
  return {
    _list: oldList, // 返回旧列表
    _pageInfo: pageInfo, // 返回传进来的列表
  }
}
// 转义数字 默认处理 分 金额
function transferredNumber(num = 0, multiple) {
  multiple = multiple || 100
  num = (num / multiple).toFixed(2)
  return num
}
// 获取时间 返回[yyyy,MM,DD,HH,mm,ss]
function getDate() {
  const myDate = new Date()
  const year = myDate.getFullYear()
  const mon = myDate.getMonth() + 1
  const date = myDate.getDate()
  const hours = myDate.getHours()
  const minutes = myDate.getMinutes()
  const seconds = myDate.getSeconds()
  const now = [year, mon, date, hours, minutes, seconds]
  return `${now[0]}-${now[1]}-${now[2]} ${now[3]}:${now[4]}:${now[5]}`
}

const GlobalTools = {
  getStorage,
  setStorage,
  removeStorage,
  showMsg,
  showLoading: loadStart,
  hideLoading: loadDone,
  showModel: confirmBox,
  alertBox,
  busEvent,
  jump,
  setTimer,
  handlePage,
  getDate,
  transferredNumber,
  CONST,
}

export const useGlobalTools = () => {
  const obj = {}
  for (const key in GlobalTools) {
    const temKey = key[0].substring(0, 1).toUpperCase() + key.substring(1)
    obj[`g${temKey}`] = GlobalTools[key]
  }
  return obj
}

export default GlobalTools

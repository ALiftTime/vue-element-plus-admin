/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-02-23 09:33:49
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:06:27
 */

// message 统一管理处理, 暂不需要 element 使用以下函数:
// $alert, $confirm, $loading, $message, $messageBox, $msgbox, $notify, $prompt

import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

/**
 * @class SetTimer 唯一定时器 (在一定的时间内,如果没有再次调用,就执行最后一个传入的函数)
 * @constructor
 *   @param { Function } timer
 *     {Function} install 初始化
 * @method install 初始化
 *   @param { Number } timeNum  时间
 *   @param { Function } initStart  调用 start 方法执行的默认方法
 *   @param { Function } initEnd  调用 end 方法执行的默认方法
 * @method start 开始调用
 *   @param { Function } cb  回调方法
 * @method end 结束调用
 *   @param { Function } cb  回调方法
 */
export class SetTimer {
  constructor() {
    this.timer = null
    this.timeNum = 1500
    this.initStart = null
    this.initEnd = null
  }
  install(timeNum, initStart, initEnd) {
    clearTimeout(this.timer)
    this.timeNum = timeNum || 1500
    this.initStart = initStart
    this.initEnd = initEnd
  }
  start(cb) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.initStart && this.initStart()
      cb && cb()
    }, this.timeNum)
  }
  end(cb) {
    if (!this.timer) return
    clearTimeout(this.timer)
    this.timer = null
    this.initEnd && this.initEnd()
    cb && cb()
  }
}
// 成功提示信息
export function succesMsg(msgInfo) {
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: false,
    message: msgInfo
  })
}

// 警告提示信息
export function warnMsg(msgInfo) {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: false,
    message: msgInfo
  })
}

// 错误提示信息
export function errorMsg(msgInfo) {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: false,
    message: msgInfo
  })
}

// 一般信息提示信息
export function infoMsg(msgInfo, type, offset) {
  console.log('infoMsg')

  // ElMessage.info('移动端模式下不支持切换其他布局')
  ElMessage({
    type: type || 'info',
    showClose: true,
    dangerouslyUseHTMLString: false,
    message: msgInfo,
    offset: offset || 20
  })
}

// alert 弹出框
export function alertBox(msg, title, type, btnName) {
  return ElMessageBox.alert(msg, title || '提示', {
    type: type,
    showClose: false,
    confirmButtonText: btnName || '确定',
    dangerouslyUseHTMLString: true
  })
}

// model 弹出框
export function confirmBox(msg, title, type, btnConfirm, btnCancel) {
  return ElMessageBox.confirm(msg, title || '提示', {
    type: type || 'warning',
    confirmButtonText: btnConfirm || '确定',
    cancelButtonText: btnCancel || '取消',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true
  })
}
// Loading
class Loading {
  constructor() {
    this.LoadingInstance = null
    this.autoCloseLoading = null // 自动取消loading 计时
    this.install()
  }
  install() {
    this.autoCloseLoading = new SetTimer()
    this.autoCloseLoading.install(30000, () => {
      errorMsg('加载超时,请稍后再试~')
      this.hide()
    })
  }
  show(title) {
    this.LoadingInstance = ElLoading.service({
      lock: true,
      text: title || 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.autoCloseLoading.start()
  }
  hide() {
    if (!this.LoadingInstance) return
    this.LoadingInstance.close()
    this.autoCloseLoading.end()
  }
}
const loadingObj = new Loading()
export const showLoading = function(title) {
  loadingObj.show(title)
}
export const hideLoading = function() {
  loadingObj.hide()
}

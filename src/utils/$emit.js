/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-02-26 10:32:09
 * @LastEditors: BG
 * @LastEditTime: 2022-03-12 12:26:44
 */
const handlers = {}

class Event {
  // 订阅者
  on(type, handler) {
    // 事件名和事件方法
    // 首先判断handlers内有没有type事件容器，有的话替换掉
    handlers[type] = handler
  }
  // 发布者
  emit(type, ...params) {
    // 若没有注册该事件则抛出错误
    if (!(type in handlers)) {
      console.log(`没有人订阅--${type}--方法`)
      return
    }
    // 遍历触发
    handlers[type](...params)
  }
  // 事件移除参数（事件名，删除的事件，若无第二个参数则删除该事件的订阅和发布）
  off(type, handler) {
    // 无效事件抛出
    if (!(type in handlers)) {
      return new Error('无效事件')
    }
    if (!handler) {
      // 直接移除事件
      delete handlers[type]
    } else {
      const idx = handlers[type].findIndex(ele => ele === handler)
      // 抛出异常事件
      if (idx === -1) {
        return new Error('无该绑定事件')
      }
      // 移除事件
      handlers[type].splice(idx, 1)
      if (handlers[type].length === 0) {
        delete handlers[type]
      }
    }
  }
}

module.exports = new Event()

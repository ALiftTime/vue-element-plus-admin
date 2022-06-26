/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-02-28 11:42:23
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:06:29
 */
import { warnMsg, succesMsg } from './message'
export const netWork = function() {
  window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
      if (event.type === 'offline') {
        warnMsg('您的网络已断开~')
      } else {
        succesMsg('网络已连接')
      }
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })
}

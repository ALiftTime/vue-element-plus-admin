/*
 * @Descripttion: 自定义插件
 * @version:
 * @Author: BG
 * @Date: 2022-06-20 16:13:23
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:10:40
 */
// 全局方法
import GlobalTools from '@/utils/global_tools'

export const setupCustom = (app) => {
  for (const key in GlobalTools) {
    app.config.globalProperties[`g_${key}`] = GlobalTools[key]
  }
}

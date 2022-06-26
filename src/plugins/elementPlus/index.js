/*
 * @Descripttion: element 插件配置
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 15:45:02
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:11:03
 */

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import { ElLoading, ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
import IconEp from './icon-ep.vue'
IconEp.name = 'IconEp'

const plugins = [ElLoading]

const components = [ElScrollbar, IconEp]

export const setupElementPlus = (app) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}

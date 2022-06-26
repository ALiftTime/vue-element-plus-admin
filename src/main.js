/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 17:24:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 17:02:03
 */


import 'windi.css' // 引入windi css
import '@/styles/index.less' // 引入全局样式
// import 'animate.css' // 引入动画

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store' // 引入状态管理
import { setupElementPlus } from '@/plugins/elementPlus' // 引入element-plus
import { setupCustom } from '@/plugins/custom' // 引入element-plus
import { setupRouter } from './router' // 路由

import './permission'


// 创建实例
const setupAll = async() => {
  const app = createApp(App)

  setupStore(app)

  setupElementPlus(app)

  setupCustom(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()

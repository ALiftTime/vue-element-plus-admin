/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-08 10:43:19
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 15:20:17
 */

/**
 *
    // createdRouter(roleRouters) {
      // 源路由数据创建路由 可自定义规则
      // 第一种, 动态添加所有路由
      // this.generateRoutes(roleRouters)
      // 第二种 按照一下格式,过滤路由
      // const fliterRouter = [
      //   '/level',
      //   '/level/menu1',
      //   '/level/menu2',
      //   '/level/menu1/menu1-1',
      //   '/level/menu1/menu1-1/menu1-1-1',
      //   '/level/menu1/menu1-2',
      //   '/level/menu1/menu1-3',
      // ]
      // this.generateRoutes(allRouter, fliterRouter)
    // },
 *
*/
import { defineStore } from 'pinia'
import { store } from '../index'

import { constantRouterMap, resetRouter } from '@/router'
import { generateRoutesFn1, generateRoutesFn2, flatMultiLevelRoutes } from '@/router/helperRouter'
import { useCache } from '@/hooks/web/useCache'
import CONST from '@/config/constant'
import { cloneDeep } from 'lodash-es'

const { lsCache } = useCache()

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: [],
    addRouters: [],
    isAddRouters: false,
    menuTabRouters: []
  }),
  persist: {
    enabled: true
  },
  getters: {
    getRouters() {
      return this.routers
    },
    getAddRouters() {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getIsAddRouters() {
      return this.isAddRouters
    },
    getMenuTabRouters() {
      return this.menuTabRouters
    }
  },
  actions: {
    generateRoutes(routers, whiteList) {
      return new Promise((resolve) => {
        // 动态添加路由
        let routerMap = generateRoutesFn2(routers) || []
        if (whiteList && whiteList.length > 0) {
          routerMap = generateRoutesFn1(routerMap, whiteList)
        }
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        // 渲染菜单的所有路由
        this.routers = cloneDeep(constantRouterMap).concat(routerMap)
        resolve()
      })
    },
    setIsAddRouters(state) {
      this.isAddRouters = state
    },
    setMenuTabRouters(routers) {
      this.menuTabRouters = routers
    },
    clearRouterInfo() {
      resetRouter()
      lsCache.delete(CONST.ROLE_ROUTERS)
      this.setIsAddRouters(false)
      this.setMenuTabRouters([])
      this.routers = []
      this.addRouters = []
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}

/*
 * @Descripttion: 路由配置
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 17:27:46
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:11:35
 */
import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from './helperRouter'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/template/level/menu1/menu1-1/menu1-1-1',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/system/Redirect/index.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/system/Login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登陆',
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/system/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: constantRouterMap,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


export const resetRouter = () => {
  // vue-router中的缓存问题
  // 场景介绍：网站根据用户的权限进行展示不同的菜单。使用A账号则显示全部的菜单，使用B账号则展示部分菜单，当登录A账号后，退出，立即登录B账号，则B账号没有权限的菜单应该跳转至404页面，但是现实确实跳转过去了。
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const permissionStore = usePermissionStoreWithOut()
    const { name } = route
    if (name && !resetWhiteNameList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
      permissionStore.setIsAddRouters(false)
    }
  })
}
export const setupRouter = (app) => {
  app.use(router)
}

export default router

/*
 * @Descripttion:  初始化路由
 * @version:
 * @Author: BG
 * @Date: 2022-06-13 14:02:58
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:35:37
 */
import router from './router'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useGlobalTools } from '@/utils/global_tools'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'


const permissionStore = usePermissionStoreWithOut()
const userStore = useUserStoreWithOut()
const { start, done } = useNProgress()
const { loadStart, loadDone } = usePageLoading()
const { gGetStorage } = useGlobalTools()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async(to, from, next) => {
  start()
  loadStart()
  if (userStore.getToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) return next() // 已经加载过路由了

      // 初始化并已登陆状态  配置路由
      const roleRouters = gGetStorage('ROLE_ROUTERS') || []
      await permissionStore.generateRoutes(roleRouters)

      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route) // 动态添加可访问路由表
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title)
  done()
  loadDone()
})

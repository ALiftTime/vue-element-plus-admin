/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 09:59:59
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 19:34:44
 */

import { isUrl } from '@/utils/is'
import { omit, cloneDeep } from 'lodash-es'
import { createRouter, createWebHistory } from 'vue-router'

/* Layout */
export const Layout = () => import('@/layout/index.vue')

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}

// 加载路由
function modules(file) {
  return process.env.NODE_ENV === 'development'
    ? require('@/views' + file).default
    : () => import('@/views' + file)
}

// 配置路径
export const pathResolve = function(parentPath, path) {
  if (isUrl(path)) return path
  const _childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${_childPath}`.replace(/\/\//g, '/')
}

/**
 * 根据路由白名单创建路由
 * http 链接不过滤 !!!
 * @param {Array} routes  路由
 * @param {string[]} keys 白名单列表
 * @param {string} basePath 基础路由
 * @returns
 */
export const generateRoutesFn1 = function(
  routes = [],
  keys = [],
  basePath = '/'
) {
  const res = []

  for (const route of routes) {
    let meta = route.meta
    if (meta.hidden) continue

    // 储存过滤后的路由对象
    let data = null
    let onlyOneChild = null
    // 如果只有一个子路由, 子路由提出, 当做父路由
    if (route.children && route.children.length === 1 && !meta.alwaysShow) {
      const _childPath = route.children[0].path
      meta = route.children[0].meta
      onlyOneChild = (
        isUrl(_childPath)
          ? _childPath
          : pathResolve(route.path, _childPath)
      )
    }

    for (const item of keys) {
      // 如果链接存在
      if (isUrl(item) && (onlyOneChild === item || route.path === item)) {
        data = Object.assign({}, route)
      } else {
        // 如果路径存在 或者 别名存在
        const routePath = pathResolve(basePath, onlyOneChild || route.path)
        if (routePath === item || meta.followAuth === item) {
          data = Object.assign({}, route)
        }
      }
    }

    if (route.children && !onlyOneChild && data) {
      data.children = generateRoutesFn1(route.children, keys, pathResolve(basePath, data.path))
    }
    if (data) res.push(data)
  }
  return res
}
/**
 * 动态添加路由
 * @param {Array} routes 路由
 */
export const generateRoutesFn2 = function(routes) {
  const res = []

  for (const route of routes) {
    const data = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    }
    if (route.component) {
      const component = route.component
      if (component === '&Layout') {
        data.component = Layout
      } else if (component === '#') {
        data.component = getParentLayout()
      } else {
        const comModule = modules(route.component)
        comModule ? data.component = comModule : console.error(`未找到${route.component}.vue文件,请创建`)
      }
    }
    if (route.children) {
      data.children = generateRoutesFn2(route.children)
    }
    res.push(data)
  }
  return res
}

/* -------------- 路由降级处理 ----------------*/

// 格式化子路由是否存在 '/'
function checkChildRouter(route) {
  if (!route.children) return
  route.children.forEach(item => {
    if (item.path.startsWith('/')) {
      console.warn(`子路由${item.path}不要加 '/'`)
      item.path = item.path.slice(1)
    }
    checkChildRouter(item)
  })
}
// 层级是否大于 2 层
function isMultipleRoute(route) {
  if (!route || !Reflect.has(route, 'children') || !route.children.length) {
    return false
  }

  const _children = route.children
  let flag = false

  for (let index = 0; index < _children.length; index++) {
    const child = _children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

/**
 * 添加所有子菜单
 * @param {*} routes  生成后的二级路由
 * @param {*} children 路由表的子路由
 * @param {*} routeModule 路由表
 */
function addToChildren(
  routes = [],
  children = [],
  routeModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find(item => item.name === child.name)
    if (!route) continue
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find(item => item.name === route.name)) {
      routeModule.children?.push(route)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// 生成二级路由
function promoteRouteLevel(route) {
  checkChildRouter(route)
  // 如果嵌套多层没有处理的话，路由缓存在深层级下是没有办法生效的
  let router = createRouter({
    routes: [route],
    history: createWebHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, route.children || [], route)
  router = null
  route.children = route.children.map(item => omit(item, 'children'))
}

export const flatMultiLevelRoutes = function(routes) {
  const modules = cloneDeep(routes)
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index]
    if (!isMultipleRoute(route)) {
      continue
    } else {
      promoteRouteLevel(route)
    }
  }
  return modules
}

// 获得原始的路由
export const getRawRoute = (route) => {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (
      matched
        ? matched.map(i => ({
          meta: i.meta,
          name: i.name,
          path: i.path
        }))
        : undefined
    )
  }
}

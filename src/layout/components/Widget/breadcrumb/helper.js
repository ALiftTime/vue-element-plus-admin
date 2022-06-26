/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-11 14:10:29
 * @LastEditors: BG
 * @LastEditTime: 2022-06-24 10:15:39
 */
import { pathResolve } from '@/router/helperRouter'

export const filterBreadcrumb = function(
  routes = [],
  parentPath = ''
) {
  const res = []

  for (const route of routes) {
    const meta = route?.meta
    // 如果面包屑也不显示,隐藏的路由
    // if (meta.hidden && !meta.showMainRoute) {
    //   continue
    // }

    const data =
      !meta.alwaysShow && route.children?.length === 1
        ? { ...route.children[0], path: pathResolve(route.path, route.children[0].path) }
        : { ...route }
    data.path = pathResolve(parentPath, data.path)

    if (data.children) {
      data.children = filterBreadcrumb(data.children, data.path)
    }
    if (data) res.push(data)
  }
  return res
}

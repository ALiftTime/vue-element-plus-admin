/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-17 20:22:49
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 20:30:55
 */
import { pathResolve } from '@/utils/routerHelper'

// 过滤出固定标签
export const filterAffixTags = (
  routes,
  parentPath
) => {
  let tags = []
  routes.forEach(route => {
    const meta = route.mate
    const tagPath = pathResolve(parentPath, route.path)
    if (meta?.affix) {
      tags.push({ ...route, path: tagPath, fullPath: tagPath })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, tagPath)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
}

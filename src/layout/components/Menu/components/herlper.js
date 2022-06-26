/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 10:27:35
 * @LastEditors: BG
 * @LastEditTime: 2022-06-11 14:30:25
 */

import { ref, unref } from 'vue'
import { _TfindPath } from '@/utils/tree'
export const getAllParentPath = (treeData, path) => {
  const menuList = _TfindPath(treeData, (n) => n.path === path) || []
  return menuList.map(item => item.path)
}
export const hasOneShowingChild = function(children = [], parent) {
  const onlyOneChild = ref()
  const showingChildren = children.filter(v => {
    const meta = (v.meta ?? {})
    if (meta.hidden) {
      return false
    } else {
      onlyOneChild.value = v
      return true
    }
  })

  // 只有一个子路由
  if (showingChildren.length === 1) {
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }
  // 没有子路由
  if (!showingChildren.length) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }
  // 多个子路由
  return {
    oneShowingChild: false,
    onlyOneChild: unref(onlyOneChild)
  }
}

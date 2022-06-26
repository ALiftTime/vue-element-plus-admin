/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-18 14:39:42
 * @LastEditors: BG
 * @LastEditTime: 2022-06-20 11:35:20
 */
import { computed, unref, ref, nextTick } from 'vue'
import { pathResolve } from '@/router/helperRouter'

import { usePermissionStore } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'

let currentRoute, push, replace
function initRouter(useRouter) {
  const router = useRouter()
  currentRoute = router.currentRoute
  push = router.push
  replace = router.replace
}
const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.getVisitedViews)
const routers = computed(() => permissionStore.getRouters)

// 是否是当前tag
const isActive = (route) => route.path === unref(currentRoute).path
// 过滤出固定标签
const filterAffixTags = (
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
  return tags
}
// 选择最后一个tag
const toLastView = () => {
  const latestView = visitedViews.value.slice(-1)[0]
  if (latestView) {
    push(latestView)
  } else {
    if (
      unref(currentRoute).path === permissionStore.getAddRouters[0].path ||
      unref(currentRoute).path === permissionStore.getAddRouters[0].redirect
    ) {
      addTags()
      return
    }
    push(permissionStore.getAddRouters[0].path)
  }
}

const affixTagArr = ref([])
const selectedTag = ref()

// 初始化tag
const initTags = () => {
  affixTagArr.value = filterAffixTags(unref(routers))
  for (const tag of unref(affixTagArr)) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}
// 新增tag
const addTags = () => {
  const { name } = unref(currentRoute)
  if (name) {
    selectedTag.value = unref(currentRoute)
    tagsViewStore.addView(unref(currentRoute))
  }
}
// 关闭选中的tag
const closeSelectedTag = (view) => {
  if (view?.meta?.affix) return
  tagsViewStore.delView(view)
  if (isActive(view)) {
    toLastView()
  }
}
// 关闭全部
const closeAllTags = () => {
  tagsViewStore.delAllViews()
  toLastView()
}
// 关闭其他
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(unref(selectedTag))
}
// 关闭左侧
const closeLeftTags = () => {
  tagsViewStore.delLeftViews(unref(selectedTag))
}
// 关闭右侧
const closeRightTags = () => {
  tagsViewStore.delRightViews(unref(selectedTag))
}
// 重新加载
const refreshSelectedTag = async(view) => {
  if (!view) return
  tagsViewStore.delCachedView()
  const { path, query } = view
  await nextTick()
  replace({
    path: '/redirect' + path,
    query: query
  })
}

// 获取菜单功能列表
const getMenuFunList = (route) => {
  const _visitedViews = visitedViews.value
  return [
    {
      icon: 'refresh',
      label: '重新加载',
      disabled: selectedTag.value?.fullPath !== route.fullPath,
      command: () => {
        refreshSelectedTag(route)
      }
    },
    {
      icon: 'closeBold',
      label: '关闭标签页',
      disabled: !!_visitedViews?.length && selectedTag.value?.meta.affix,
      command: () => {
        closeSelectedTag(route)
      }
    },
    {
      divided: true,
      icon: 'ArrowLeft',
      label: '关闭左侧标签页',
      disabled:
        !!_visitedViews?.length &&
        (route.fullPath === _visitedViews[0].fullPath ||
          selectedTag.value?.fullPath !== route.fullPath),
      command: () => {
        closeLeftTags()
      }
    },
    {
      icon: 'ArrowRight',
      label: '关闭右侧标签页',
      disabled:
        !!_visitedViews?.length &&
        (route.fullPath === _visitedViews[_visitedViews.length - 1].fullPath ||
          selectedTag.value?.fullPath !== route.fullPath),
      command: () => {
        closeRightTags()
      }
    },
    {
      divided: true,
      icon: 'CollectionTag',
      label: '关闭其他标签页',
      disabled: selectedTag.value?.fullPath !== route.fullPath,
      command: () => {
        closeOthersTags()
      }
    },
    {
      icon: 'semiSelect',
      label: '关闭全部标签页',
      command: () => {
        closeAllTags()
      }
    }
  ]
}

export {
  initRouter,
  initTags,
  addTags,
  closeSelectedTag,
  isActive,
  getMenuFunList
}

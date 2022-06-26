/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-11 10:46:07
 * @LastEditors: BG
 * @LastEditTime: 2022-06-18 17:41:35
 */
import router from '@/router'
import { getRawRoute } from '@/router/helperRouter'
import { defineStore } from 'pinia'
import { store } from '../index'
import { findIndex } from '@/utils'

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => ({
    visitedViews: [], // 标签列表
    cachedViews: new Set() // 缓存列表
  }),
  getters: {
    getVisitedViews() {
      return this.visitedViews
    },
    getCachedViews() {
      return Array.from(this.cachedViews)
    }
  },
  actions: {
    /* --------- 新增 ------*/
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView()
    },
    // 新增 tag
    addVisitedView(view) {
      if (this.visitedViews.some(s => s.path === view.path)) return
      if (view.meta?.noTagsView) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    // 新增缓存
    addCachedView() {
      const cacheMap = new Set()
      for (const v of this.visitedViews) {
        const item = getRawRoute(v)
        const needCache = !item.meta?.noCache
        if (!needCache) continue
        const name = item.name
        cacheMap.add(name)
      }
      if (Array.from(this.cachedViews).sort().toString() === Array.from(cacheMap).sort().toString()) return
      this.cachedViews = cacheMap
    },
    /* --------- 新增 ------*/
    // 删除tag
    delVisitedView(view) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    // 删除当前tag缓存
    delCachedView() {
      const route = router.currentRoute.value
      const index = findIndex(this.getCachedViews, (v) => v === route.name)
      if (index > -1) {
        this.cachedViews.delete(this.getCachedViews[index])
      }
    },
    // 删除其他tag
    delOthersVisitedViews(view) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.affix || v.path === view.path
      })
    },
    // 删除某个
    delView(view) {
      this.delVisitedView(view)
      this.addCachedView()
    },
    // 删除所有缓存和tag
    delAllViews() {
      this.delAllVisitedViews()
      this.addCachedView()
    },
    // 删除所有tag
    delAllVisitedViews() {
      // const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
      this.visitedViews = []
    },
    // 删除其他
    delOthersViews(view) {
      this.delOthersVisitedViews(view)
      this.addCachedView()
    },
    // 删除左侧
    delLeftViews(view) {
      const index = findIndex(this.visitedViews, (v) => v.path === view.path)
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.affix || v.path === view.path || i > index
        })
        this.addCachedView()
      }
    },
    // 删除右侧
    delRightViews(view) {
      const index = findIndex(this.visitedViews, (v) => v.path === view.path)
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v?.meta?.affix || v.path === view.path || i < index
        })
        this.addCachedView()
      }
    },
    // 更新标签
    updateVisitedView(view) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})

export const useTagsViewStoreWithOut = () => {
  return useTagsViewStore(store)
}

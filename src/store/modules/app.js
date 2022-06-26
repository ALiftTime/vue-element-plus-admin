/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 17:19:02
 * @LastEditors: BG
 * @LastEditTime: 2022-06-22 17:03:43
 */
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { useCache } from '@/hooks/web/useCache'
import { appModules } from '@/config/app'
import { setCssVar, humpToUnderline } from '@/utils'
import { store } from '../index'
import CONST from '@/config/constant'

const { lsCache } = useCache()

export const useAppStore = defineStore('app', {
  state: () => appModules,
  persist: {
    enabled: true
  },
  getters: {
    getCollapse() {
      return this.collapse
    },
    getUniqueOpened() {
      return this.uniqueOpened
    },
    getHamburger() {
      return this.hamburger
    },
    getTagsViewIcon() {
      return this.tagsViewIcon
    },
    getFixedHeader() {
      return this.fixedHeader
    },
    getGreyMode() {
      return this.greyMode
    },
    getPageLoading() {
      return this.pageLoading
    },
    getLayout() {
      return this.layout
    },
    getTitle() {
      return this.title
    },
    getUserInfo() {
      return this.userInfo
    },
    getCurrentSize() {
      return this.currentSize
    },
    getMobile() {
      return this.mobile
    },
    getFooter() {
      return this.footer
    }
  },

  actions: {
    setCollapse(collapse) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger) {
      this.hamburger = hamburger
    },
    setFixedHeader(fixedHeader) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode) {
      this.greyMode = greyMode
    },
    setPageLoading(pageLoading) {
      this.pageLoading = pageLoading
    },
    setLayout(layout) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      lsCache.set(CONST.LAYOUT, this.layout)
    },
    setTitle(title) {
      this.title = title
    },
    setIsDark(isDark) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    },
    setCurrentSize(currentSize) {
      this.currentSize = currentSize
      lsCache.set(CONST.COMPONENT_SIZE, this.currentSize)
    },
    setMobile(mobile) {
      this.mobile = mobile
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}

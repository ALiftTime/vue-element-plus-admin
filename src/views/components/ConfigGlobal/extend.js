/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-08 20:12:58
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:36:17
 */

import { watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { setCssVar } from '@/utils'
import { isDark } from '@/utils/is'

// 监听窗口变化
export const watchWindow = function(appStore) {
  const { width } = useWindowSize()

  // 监听窗口变化
  watch(
    () => width.value,
    (width) => {
      if (width < 768) {
        !appStore.getMobile ? appStore.setMobile(true) : undefined
        setCssVar('--left-menu-min-width', '0')
        appStore.setCollapse(true)
        appStore.getLayout !== 'classic' ? appStore.setLayout('classic') : undefined
      } else {
        appStore.getMobile ? appStore.setMobile(false) : undefined
        setCssVar('--left-menu-min-width', '64px')
      }
    },
    {
      immediate: true
    }
  )
}

// 设置主题
export const setDefaultTheme = function(appStore) {
  // 根据浏览器当前主题设置系统主题色
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

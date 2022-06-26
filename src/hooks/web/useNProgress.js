/*
 * @Descripttion: 进度条
 * @version: 1.0.0
 * @Author: BG
 * @Date: 2022-06-13 14:11:42
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:09:07
 */
import { nextTick, unref } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useCssVar } from '@vueuse/core'

const primaryColor = useCssVar('--el-color-primary', document.documentElement)

export const useNProgress = () => {
  NProgress.configure({ showSpinner: false })

  const initColor = async() => {
    await nextTick()
    const bar = document.getElementById('nprogress')?.getElementsByClassName('bar')[0]
    if (bar) {
      bar.style.background = unref(primaryColor.value)
    }
  }
  initColor()

  const start = () => { NProgress.start() }
  const done = () => { NProgress.done() }
  return {
    start,
    done
  }
}

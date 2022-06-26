/*
 * @Descripttion:  页面loading
 * @version: 1.0.0
 * @Author: BG
 * @Date: 2022-06-13 14:21:35
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:09:22
 */
import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

export const usePageLoading = () => {
  const loadStart = () => {
    appStore.setPageLoading(true)
  }

  const loadDone = () => {
    appStore.setPageLoading(false)
  }

  return {
    loadStart,
    loadDone
  }
}

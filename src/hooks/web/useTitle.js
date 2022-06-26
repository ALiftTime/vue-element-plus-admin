/*
 * @Descripttion: 窗口标题
 * @version: 1.0.0
 * @Author: BG
 * @Date: 2022-06-13 14:06:42
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:09:39
 */
import { watch, ref } from 'vue'
import { isString } from '@/utils/is'
import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

export const useTitle = (newTitle) => {
  const title = ref(
    newTitle ? `${appStore.getTitle} - ${newTitle}` : appStore.getTitle
  )

  watch(
    title,
    (n, o) => {
      if (isString(n) && n !== o && document) {
        document.title = n
      }
    },
    { immediate: true }
  )
}

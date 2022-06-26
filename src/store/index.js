/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 15:41:33
 * @LastEditors: BG
 * @LastEditTime: 2022-06-20 17:50:56
 */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

export const setupStore = (app) => {
  app.use(store)
}

export { store }

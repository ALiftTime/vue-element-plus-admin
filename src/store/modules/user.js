/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-20 17:33:38
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 14:58:47
 */
import { defineStore } from 'pinia'
import { store } from '../index'
import { useGlobalTools } from '@/utils/global_tools'

const { gGetStorage, gSetStorage, gRemoveStorage } = useGlobalTools()


export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: gGetStorage('USER_INFO') || '',
    loginInfo: gGetStorage('LOGIN_INFO') || '',
  }),
  persist: {
    enabled: true
  },
  getters: {
    getToken() {
      return this.loginInfo.token
    },
    getLoginInfo() {
      return this.loginInfo
    },
    getUserInfo() {
      return this.userInfo
    }
  },
  actions: {
    setLoginInfo(loginInfo) {
      gSetStorage('LOGIN_INFO', loginInfo)
      this.loginInfo = loginInfo
    },
    setUserInfo(userInfo) {
      gSetStorage('USER_INFO', userInfo)
      this.userInfo = userInfo
    },
    clearUserInfo() {
      if (!this.userInfo.rememberMe) gRemoveStorage('USER_INFO')
      gRemoveStorage('LOGIN_INFO')
      this.loginInfo = {}
      this.userInfo = {}
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}

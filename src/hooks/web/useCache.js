/*
 * @Descripttion: 配置浏览器本地存储的方式，可直接存储对象数组
 * @version: 1.0.0
 * @Author: BG
 * @Date: 2022-06-07 17:44:44
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:07:54
 */

import WebStorageCache from 'web-storage-cache'

const lsCache = new WebStorageCache({
  storage: 'localStorage'
})

const ssCache = new WebStorageCache({
  storage: 'sessionStorage'
})

if (!lsCache.isSupported()) alert('当前浏览器版本不支持缓存')

export const useCache = () => {

  lsCache.deleteAllExpires()

  return {
    lsCache,
    ssCache
  }
}

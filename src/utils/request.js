/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2021-12-04 19:35:51
 * @LastEditors: BG
 * @LastEditTime: 2022-06-26 10:59:05
 */

import axios from 'axios'
import Router from '@/router'
import { warnMsg, errorMsg, alertBox, showLoading, hideLoading, SetTimer } from './message'
import errorCode from '@/utils/errorCode'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const tagsViewStore = useTagsViewStore()

const Loading = new SetTimer()
Loading.install(
  2000,
  () => {
    return showLoading('网络加载中,请稍后~')
  },
  () => {
    return hideLoading()
  }
)

const LoginOut = new SetTimer()
LoginOut.install(2000, () => {
  alertBox('登陆状态失效,请您重新登陆~').then(() => {
    userStore.clearUserInfo()
    permissionStore.clearRouterInfo() // 重置静态路由表
    tagsViewStore.delAllViews()
    const currentRouter = window.location.href.replace(window.location.origin, '')
    Router.replace(`/login?redirect=${currentRouter}`)
  })
  LoginOut.end()
})

const request = axios.create({
  timeout: 20 * 1000,
  responseType: 'json',
  headers: { 'content-type': 'application/json;charset=UTF-8' },
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false
})
// 请求拦截
request.interceptors.request.use(
  (config) => {
    // console.log('config', config)
    Loading.start()
    // const token = userStore.getToken
    // if (token && !config.isToken) {
    //   config.headers[_userInfo.tokenHeader] = _userInfo.tokenHead + token
    // } else {
    //   // 返回登录
    // }
    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    Loading.end()
    const data = response.data.data
    const errmsg = response.data.resp_msg
    const errno = response.data.resp_code
    // 获取错误 code
    const code = errno + '' || response.status
    // 前端提示信息
    const msg = errorCode[code]
    switch (code) {
      case '200':
        return data
      case '404': // 服务端请求地址错误
        errorMsg('网络请求错误~')
        console.error(errmsg)
        return Promise.reject(response)
      case '500':
        errorMsg(msg || errmsg)
        return Promise.reject(response)
      default:
        errorMsg('对不起客官,请联系管理人员~')
        console.error(errmsg)
        return Promise.reject(response)
    }
  },
  (error) => {
    Loading.end()
    let { message } = error
    if (message === 'Network Error') {
      message = '客户端断网了~'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    warnMsg(message)
    return Promise.reject(error)
  }
)

function sendRequest(url, method, requestConfig, type) {
  const transUrl = url.replace(/^\//g, '')
  return function(params) {
    type = type || (method === 'get' ? 'params' : 'data')
    const basic = {
      method,
      url: transUrl,
      [type]: params || {}
    }
    const allConfig = Object.assign({}, basic, requestConfig || {})
    return new Promise((res, rej) => {
      request(allConfig)
        .then((json) => {
          res(json)
        })
        .catch((error) => {
          rej(error)
        })
    })
  }
}

const getMethod = {
  get: (url, config, type) => sendRequest(url, 'get', config, type),
  post: (url, config, type) => sendRequest(url, 'post', config, type)
}

export default getMethod

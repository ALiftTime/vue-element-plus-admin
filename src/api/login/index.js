/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 17:20:17
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 16:46:15
 */
import request from '@/utils/request'

export default {
  authTree: request.post('/mock/auth-tree/index')
}

/*
 * @Descripttion: 自定义 css 类名前缀
 * @version: 1.0.0
 * @Author: BG
 * @Date: 2022-06-08 19:56:51
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 16:08:42
 */
import variables from '@/styles/variables.module.less'

export const useDesign = () => {
  const lessVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope) => {
    return `${lessVariables.namespace}-${scope}`
  }

  return {
    variables: lessVariables,
    getPrefixCls
  }
}

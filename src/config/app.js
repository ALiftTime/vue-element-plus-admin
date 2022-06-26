/*
 * @Descripttion: 主题配置文件
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 17:50:07
 * @LastEditors: BG
 * @LastEditTime: 2022-06-26 10:50:35
 */
import { useCache } from '@/hooks/web/useCache'
import CONST from './constant'

const { lsCache } = useCache()

export const appModules = {
  title: 'vue-element-plus-admin', // 标题
  collapse: false, // 折叠菜单  需要 hamburger 一起配合
  uniqueOpened: false, // 是否只保持一个子菜单的展开
  hamburger: true, // 折叠图标
  // tagsViewIcon: true, // 是否显示标签图标
  fixedHeader: true, // 固定toolheader
  footer: false, // 显示页脚
  greyMode: false, // 是否开始灰色模式，用于特殊悼念日
  sizeMap: ['default', 'large', 'small'],

  mobile: false, // 是否是移动端
  pageLoading: false, // 路由跳转loading

  layout: lsCache.get(CONST.LAYOUT) || 'dual', // layout布局   'classic' | 'classicTop' | dual | 'cutMenu'
  // isDark: false, // 是否是暗黑模式
  currentSize: lsCache.get(CONST.COMPONENT_SIZE) || 'default', // 组件尺寸 'default' | 'large' | 'small'
  theme: {
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit',
    // 头部背景颜色
    topHeaderBgColor: '#fff',
    // 头部字体颜色
    topHeaderTextColor: 'inherit',
    // 头部悬停颜色
    topHeaderHoverColor: '#f6f6f6',
    // 头部边框颜色
    topToolBorderColor: '#eee'
  }
}

/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-09 14:47:59
 * @LastEditors: BG
 * @LastEditTime: 2022-06-15 18:00:18
 */

import { ElSubMenu, ElMenuItem } from 'element-plus'
import { isUrl } from '@/utils/is'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { useDesign } from '@/hooks/web/useDesign'
import { pathResolve } from '@/router/helperRouter'
import { getAllParentPath, hasOneShowingChild } from './herlper'


export const useRenderMenuItem = function(allRouters, menuMode) {
  const renderMenuItem = (routers) => {
    return (routers || allRouters).map((v) => {
      const meta = (v.meta ?? {})
      if (!meta.hidden) {
        // 这块设计有缺陷
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)
        // 这块设计有缺陷
        const fullPath = isUrl(v.path)
          ? v.path
          : getAllParentPath(allRouters, v.path).join('/')
        const { renderMenuTitle } = useRenderMenuTitle()

        if (
          oneShowingChild &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
          !meta?.alwaysShow
        ) {
          return (
            <ElMenuItem index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}>
              {{
                default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
              }}
            </ElMenuItem>
          )
        } else {
          const { getPrefixCls } = useDesign()
          const preFixCls = getPrefixCls('menu-popper')

          return (
            <ElSubMenu
              index={fullPath}
              popperClass={
                menuMode === 'vertical' ? `${preFixCls}--vertical` : `${preFixCls}--horizontal`
              }
            >
              {{
                title: () => renderMenuTitle(meta),
                default: () => renderMenuItem(v.children)
              }}
            </ElSubMenu>
          )
        }
      }
    })
  }
  return {
    renderMenuItem
  }
}


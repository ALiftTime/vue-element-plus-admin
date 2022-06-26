/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-09 20:46:55
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 18:03:57
 */

export const useRenderMenuTitle = () => {
  const renderMenuTitle = (meta) => {
    const { title = 'Please set title', icon } = meta
    return icon ? (
      <>
        <icon-ep icon={icon}></icon-ep>
        <span class='v-menu__title'>{title}</span>
      </>
    ) : (
      <span class='v-menu__title'>{title}</span>
    )
  }
  return {
    renderMenuTitle
  }
}

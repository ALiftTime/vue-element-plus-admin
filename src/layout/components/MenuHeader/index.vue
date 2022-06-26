<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-22 17:06:51
 * @LastEditors: BG
 * @LastEditTime: 2022-06-24 11:05:17
-->
<script setup>
import { ref } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useDesign } from '@/hooks/web/useDesign'
import { cloneDeep } from 'lodash-es'

import UserInfo from '../Widget/userInfo'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { constantRouterMap } from '@/router'

const { getPrefixCls, variables } = useDesign()
const { currentRoute } = useRouter()
const prefixCls = getPrefixCls('tool-header')
const permissionStore = usePermissionStoreWithOut()


const mainMenu = cloneDeep(permissionStore.routers.filter(router => (
  constantRouterMap.findIndex(v => v.path === router.path) === -1
)
))
const currentMainPath = ref('/')

const getMainPath = (route) => {
  const index = route.fullPath.slice(1).search('/') + 1
  const mainPath = route.fullPath.slice(0, index)
  const temRoute = cloneDeep(mainMenu.filter(v => v.path === mainPath)[0])
  const childrenMenu = temRoute.children.map(v => {
    v.path = temRoute.path + '/' + v.path
    return v
  })
  return {
    mainPath,
    childrenMenu
  }
}

currentMainPath.value = getMainPath(currentRoute.value).mainPath
permissionStore.setMenuTabRouters(getMainPath(currentRoute.value).childrenMenu)


const onChangChildrenMenu = (router) => {
  if (currentMainPath.value !== router.path && router?.children) {
    const temRoute = cloneDeep(router)
    const childrenMenu = temRoute.children.map(v => {
      v.path = temRoute.path + '/' + v.path
      return v
    })
    currentMainPath.value = router.path
    permissionStore.setMenuTabRouters(childrenMenu)
  }
}
onBeforeRouteLeave(to => {
  if (to.name === 'Redirect') return
  const _route = getMainPath(to)
  if (_route.mainPath !== currentMainPath.value && _route.childrenMenu) {
    currentMainPath.value = _route.mainPath
    permissionStore.setMenuTabRouters(_route.childrenMenu)
  }
})
</script>

<template>
  <div
    :id="`${variables.namespace}-tool-header`"
    :class="[
      prefixCls,
      'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
      'dark:(bg-[var(--el-bg-color)]',
      'overflow-hidden'
    ]"
  >
    <div class="h-full w-full flex items-center overflow-hidden bg-[var(--left-menu-bg-color)]">
      <ElScrollbar style="width:100%;">
        <div class="flex whitespace-pre">
          <div
            v-for="item in mainMenu"
            :key="item.name"
            class="
              px-4 text-center text-xl
              leading-[var(--top-tool-height)] h-[var(--top-tool-height)]
              cursor-pointer
              mainMenu
            "
            :class="{'is-active': currentMainPath === item.path}"
            @click="onChangChildrenMenu(item)"
          >
            {{ item?.meta?.title || 'no title' }}
          </div>
        </div>
      </ElScrollbar>
    </div>
    <div class="h-full w-34 flex items-center">
      <UserInfo class="hover-tigger" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tool-header';

.@{prefix-cls} {
  transition: left var(--transition-time-02);
  color: var(--left-menu-text-color);
  .is-active{
    color: var(--left-menu-text-active-color) !important;
    background-color: var(--left-menu-bg-active-color) !important;
  }
  .mainMenu:hover{
    color: var(--left-menu-text-active-color) !important;
  }
}
</style>

<!--
 * @Descripttion: 用户信息
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 18:16:42
 * @LastEditors: BG
 * @LastEditTime: 2022-06-22 18:45:52
-->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useDesign } from '@/hooks/web/useDesign'

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const tagsViewStore = useTagsViewStore()

const { replace } = useRouter()
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('user-info')

const userInfo = computed(() => userStore.getUserInfo)

const loginOut = () => {
  ElMessageBox.confirm('温馨提示', '是否要退出当前账户', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async() => {
      // const res = await loginOutApi().catch(() => {})
      userStore.clearUserInfo()
      permissionStore.clearRouterInfo() // 重置静态路由表
      tagsViewStore.delAllViews()
      replace('/login')
    })
    .catch(() => {})
}
// const toDocument = () => {
//   window.open('https://element-plus-admin-doc.cn/')
// }
</script>

<template>
  <ElDropdown :class="prefixCls" trigger="click">
    <div class="flex items-center">
      <img
        src="@/assets/imgs/avatar.jpg"
        alt=""
        class="w-[calc(var(--tags-view-height)-10px)] rounded-[50%]"
      >
      <span class="truncate <lg:hidden text-14px pl-[5px] text-[var(--top-header-text-color)]">{{ userInfo.username }}</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <!-- <ElDropdownItem>
          <div @click="toDocument">
            链接
          </div>
        </ElDropdownItem> -->
        <ElDropdownItem divided>
          <div @click="loginOut">
            退出账户
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

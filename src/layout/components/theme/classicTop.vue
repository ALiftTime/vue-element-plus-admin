<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 18:03:57
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 15:57:34
-->
<template>
  <div class="flex items-center justify-between bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)] dark:border-[var(--el-border-color)]">
    <Logo class="hover-tigger" />
    <Menu class="flex-1 px-10px h-[var(--top-tool-height)]" />
    <div class="px-4">
      <UserInfo />
    </div>
  </div>
  <div :class="[`${prefixCls}-content`, 'h-full w-full']">
    <ElScrollbar
      v-loading="pageLoading"
      :class="[
        `${prefixCls}-content-scrollbar`,
        {
          'mt-[var(--tags-view-height)]': fixedHeader
        }
      ]"
    >
      <TagsView
        :class="[
          'border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]',
          {
            '!fixed w-full top-[var(--top-tool-height)] left-0': fixedHeader
          }
        ]"
        style="transition: width var(--transition-time-02), left var(--transition-time-02);"
      />

      <AppView />
    </ElScrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

import Logo from '../Logo'
import Menu from '../Menu'
import UserInfo from '../Widget/userInfo'
import TagsView from '../TagsView'
import AppView from '../AppView'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')
const appStore = useAppStore()

const pageLoading = computed(() => appStore.getPageLoading)
const fixedHeader = computed(() => appStore.getFixedHeader)

</script>

<style scoped lang='less'>
</style>

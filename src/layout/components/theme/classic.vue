<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 18:03:57
 * @LastEditors: BG
 * @LastEditTime: 2022-06-22 16:59:22
-->
<template>
  <div :class="['absolute top-0 left-0 h-full', { '!fixed z-3000': mobile }]">
    <Logo
      :class="[
        'bg-[var(--left-menu-bg-color)] border-bottom-1 border-solid border-[var(--logo-border-color)] dark:border-[var(--el-border-color)]',
        {
          '!pl-0': mobile && collapse,
          'w-[var(--left-menu-min-width)]': appStore.getCollapse,
          'w-[var(--left-menu-max-width)]': !appStore.getCollapse
        }
      ]"
      style="transition: all var(--transition-time-02);"
    />
    <Menu :class="['!h-[calc(100%-var(--logo-height))]' ]" />
  </div>
  <div
    :class="[
      `${prefixCls}-content`,
      'absolute top-0 h-[100%]',
      {
        'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]': collapse && !mobile,
        'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]': !collapse && !mobile,
        'fixed !w-full !left-0': mobile
      }
    ]"
    style="transition: all var(--transition-time-02);"
  >
    <ElScrollbar
      v-loading="pageLoading"
      :class="[
        `${prefixCls}-content-scrollbar`,
        {
          '!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))] mt-[calc(var(--top-tool-height)+var(--tags-view-height))]':
            fixedHeader
        }
      ]"
    >
      <div
        :class="[
          {
            'fixed top-0 left-0 z-10': fixedHeader,
            'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
              collapse && fixedHeader && !mobile,
            'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
              !collapse && fixedHeader && !mobile,
            '!w-full !left-0': mobile
          }
        ]"
        style="transition: all var(--transition-time-02);"
      >
        <ToolHeader class="border-bottom-1 border-solid border-[var(--top-tool-border-color)] bg-[var(--top-header-bg-color)] dark:border-[var(--el-border-color)]" />

        <TagsView class="border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]" />
      </div>
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
import ToolHeader from '../ToolHeader'
import TagsView from '../TagsView'
import AppView from '../AppView'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')
const appStore = useAppStore()

const mobile = computed(() => appStore.getMobile)
const collapse = computed(() => appStore.getCollapse)
const pageLoading = computed(() => appStore.getPageLoading)
const fixedHeader = computed(() => appStore.getFixedHeader)

</script>

<style scoped lang='less'>
</style>

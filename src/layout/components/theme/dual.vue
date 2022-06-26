<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 18:03:57
 * @LastEditors: BG
 * @LastEditTime: 2022-06-24 11:04:17
-->
<template>
  <div class="flex items-center bg-[var(--top-header-bg-color)] border-bottom-1 border-solid border-[var(--top-tool-border-color)] dark:border-[var(--el-border-color)] shadow-lg">
    <Logo class="hover-tigger !px-23px w-[var(--left-menu-max-width)]" />

    <MenuHeader class="flex-1" />
  </div>
  <div class="w-full h-[calc(100%-1px-var(--logo-height))] flex">
    <Menu class="!h-full" />
    <div
      :class="[
        `${prefixCls}-content`,
        'h-[100%]',
        {
          'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
            collapse,
          'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
            !collapse
        }
      ]"
      style="transition: all var(--transition-time-02);"
    >
      <ElScrollbar
        v-loading="pageLoading"
        :class="[
          `${prefixCls}-content-scrollbar`,
          {
            '!h-[calc(100%-var(--tags-view-height))] mt-[calc(var(--tags-view-height))]':
              fixedHeader
          }
        ]"
      >
        <!-- <Breadcrumb
          :class="[
            'p-14px <md:hidden w-[calc(100%-var(--left-menu-min-width))] h-auto border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)]',
            {
              '!fixed top-0 left-0 z-10 w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)] mt-[var(--logo-height)]': fixedHeader,
            }
          ]"
          style="background: linear-gradient(rgba(0,0,0,0),rgba(255,255,255,1),rgba(255,255,255,1))"
        /> -->
        <TagsView
          :class="[
            'border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]',
            {
              '!fixed top-0 left-0 z-10': fixedHeader,
              'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)] mt-[var(--logo-height)]':
                collapse && fixedHeader,
              'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)] mt-[var(--logo-height)]':
                !collapse && fixedHeader
            }
          ]"
          style="transition: width var(--transition-time-02), left var(--transition-time-02);"
        />
        <AppView />
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

import Logo from '../Logo'
import Menu from '../Menu'
import MenuHeader from '../MenuHeader'
import TagsView from '../TagsView'
// import Breadcrumb from '../Widget/breadcrumb/index'
import AppView from '../AppView'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')
const appStore = useAppStore()

const collapse = computed(() => appStore.getCollapse)
const pageLoading = computed(() => appStore.getPageLoading)
const fixedHeader = computed(() => appStore.getFixedHeader)

</script>

<style scoped lang='less'>
</style>

<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-11 09:27:11
 * @LastEditors: BG
 * @LastEditTime: 2022-06-11 16:20:14
-->
<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('footer')
const appStore = useAppStore()
const title = computed(() => appStore.getTitle)
</script>

<template>
  <div
    :class="prefixCls"
    class="text-center text-[var(--el-text-color-placeholder)] bg-[var(--app-contnet-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)] dark:bg-[var(--el-bg-color)]"
  >
    Copyright ©2021 {{ title }}
  </div>
</template>

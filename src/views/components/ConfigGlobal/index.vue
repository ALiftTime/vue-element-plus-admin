<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 17:24:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-09 09:48:34
-->
<template>
  <ElConfigProvider
    :namespace="variables.elNamespace"
    :message="{ max: 1 }"
    :size="currentSize"
  >
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ElConfigProvider>
</template>

<script setup>
import { provide, computed, onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { watchWindow, setDefaultTheme } from './extend'


const { getPrefixCls, variables } = useDesign()

const prefixCls = getPrefixCls('app')
const appStore = useAppStore()
const currentSize = computed(() => appStore.getCurrentSize)
const greyMode = computed(() => appStore.getGreyMode)

watchWindow(appStore)
setDefaultTheme(appStore)

provide('configGlobal', { size: currentSize })

// 初始化所有主题色
onMounted(() => {
  appStore.setCssVarTheme()
})

</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>

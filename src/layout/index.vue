<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 16:39:23
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:07:24
-->
<template>
  <section :class="[ prefixCls , `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']">
    <div
      v-if="mobile && !collapse"
      class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
      @click="handleClickOutside"
    />
    <component :is="layoutComponent" />
  </section>
</template>

<script setup>
import { computed, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

import Classic from './components/theme/classic.vue'
import Dual from './components/theme/dual.vue'
import ClassicTop from './components/theme/classicTop.vue'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')
const appStore = useAppStore()
const tabs = {
  'classic': Classic,
  'dual': Dual,
  'classicTop': ClassicTop
}


const mobile = computed(() => appStore.getMobile) // 是否是移动端
const collapse = computed(() => appStore.getCollapse) // 菜单折叠
const layout = computed(() => appStore.getLayout)
const layoutComponent = computed(() => tabs[unref(layout)])

const handleClickOutside = () => {
  appStore.setCollapse(true)
}

</script>

<style scoped lang='less'>
:deep(.@{elNamespace}-scrollbar__view) {
  height: 100% !important;
}
</style>

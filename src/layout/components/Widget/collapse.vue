<!--
 * @Descripttion: 缩放功能
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 17:23:48
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 18:27:32
-->
<script setup>
import { computed, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('collapse')
const appStore = useAppStore()
const collapse = computed(() => appStore.getCollapse)


const toggleCollapse = () => {
  const collapsed = unref(collapse)
  appStore.setCollapse(!collapsed)
}
defineProps({
  color: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div :class="prefixCls">
    <icon-ep
      :icon="collapse?'Expand':'Fold'"
      :size="26"
      :color="color"
      class="cursor-pointer"
      @click="toggleCollapse"
    />
  </div>
</template>
<!-- Expand  Fold -->

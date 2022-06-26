<!--
 * @Descripttion: 全屏功能
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 18:01:48
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 18:31:00
-->
<script setup>
import { useFullscreen } from '@vueuse/core'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('screenfull')

const { toggle, isFullscreen } = useFullscreen()
const toggleFullscreen = () => {
  toggle()
}
defineProps({
  color: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="prefixCls" @click="toggleFullscreen">
    <IconEp
      :size="18"
      :icon="isFullscreen ? 'FullScreen' : 'FullScreen'"
      :color="color"
    />
  </div>
</template>

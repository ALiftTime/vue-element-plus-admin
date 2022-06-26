<!--
 * @Descripttion: 更换主题尺寸
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 18:06:36
 * @LastEditors: BG
 * @LastEditTime: 2022-06-10 18:29:19
-->
<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('size-dropdown')

const appStore = useAppStore()
const sizeMap = computed(() => appStore.sizeMap)

const setCurrentSize = (size) => {
  appStore.setCurrentSize(size)
}
</script>

<template>
  <ElDropdown :class="prefixCls" trigger="click" @command="setCurrentSize">
    <!-- <Icon :size="18" icon="mdi:format-size" :color="color" class="cursor-pointer" /> -->
    更改字体
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ item }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-18 14:21:37
 * @LastEditors: BG
 * @LastEditTime: 2022-06-18 14:32:58
-->
<template>
  <ElDropdown
    ref="elDropdownMenuRef"
    :class="prefixCls"
    :trigger="trigger"
    placement="bottom-start"
    popper-class="v-context-menu-popper"
    @command="command"
    @visible-change="visibleChange"
  >
    <slot />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in schema"
          :key="`dropdown${index}`"
          :divided="item.divided"
          :disabled="item.disabled"
          :command="item"
        >
          <icon-ep :icon="item.icon" /> {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('context-menu')

const emit = defineEmits(['visibleChange'])
const props = defineProps({
  schema: {
    type: Array,
    default: () => []
  },
  trigger: {
    type: String, // 'click' | 'hover' | 'focus' | 'contextmenu'
    default: 'contextmenu'
  },
  tagItem: {
    type: Object,
    default: () => ({})
  }
})

const command = (item) => {
  item.command && item.command(item)
}
const visibleChange = (visible) => {
  emit('visibleChange', visible, props.tagItem)
}
const elDropdownMenuRef = ref()
defineExpose({
  elDropdownMenuRef,
  tagItem: props.tagItem
})

</script>

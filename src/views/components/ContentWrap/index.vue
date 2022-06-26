<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-26 10:16:27
 * @LastEditors: BG
 * @LastEditTime: 2022-06-26 10:47:02
-->
<script setup>
import { ElCard, ElTooltip } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import IconEp from '../../../plugins/elementPlus/icon-ep.vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-wrap')

defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <ElCard :class="[prefixCls, 'mb-20px']" shadow="never">
    <template v-if="title" #header>
      <div class="flex items-center">
        <span class="text-16px font-700">{{ title }}</span>
        <ElTooltip v-if="message" effect="dark" placement="right">
          <template #content>
            <div class="max-w-200px">
              {{ message }}
            </div>
          </template>
          <IconEp class="ml-5px" icon="Comment" :size="14" />
        </ElTooltip>
      </div>
    </template>
    <div>
      <slot />
    </div>
  </ElCard>
</template>

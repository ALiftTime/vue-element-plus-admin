<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-17 10:48:42
 * @LastEditors: BG
 * @LastEditTime: 2022-06-17 18:03:17
-->
<template>
  <el-icon :size="size" :color="color">
    <component :is="icon" class="icon" />
  </el-icon>
</template>

<script>
import { icons } from '@element-plus/icons-vue/global'

export default {
  name: 'IconEq',
  components: { ...icons },
  props: {
    icon: {
      type: String,
      default: 'WarningFilled'
    },
    color: {
      type: String,
      default: 'inherit'
    },
    size: {
      type: Number,
      default: 0
    }
  }
}
</script>

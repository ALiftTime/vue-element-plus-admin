<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-08 17:53:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-08 18:22:28
-->
<template>
  <div class="flex justify-center">
    <div class="text-center">
      <img width="350" :src="errorMap[type].url" alt="">
      <div class="text-14px text-[var(--el-color-info)]">
        {{ errorMap[type].message }}
      </div>
      <div class="mt-20px">
        <ElButton type="primary" @click="btnClick">
          {{ errorMap[type].buttonText }}
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import pageError from '@/assets/svgs/404.svg'
import networkError from '@/assets/svgs/500.svg'
import noPermission from '@/assets/svgs/403.svg'

const errorMap = {
  '404': {
    url: pageError,
    message: '404',
    buttonText: '返回首页'
  },
  '500': {
    url: networkError,
    message: '500',
    buttonText: '返回首页'
  },
  '403': {
    url: noPermission,
    message: '403',
    buttonText: '返回首页'
  }
}

const props = defineProps({
  type: {
    type: String,
    default: '404'
  }
})
const emit = defineEmits(['errorClick'])
const btnClick = () => {
  emit('errorClick', props.type)
}
</script>

<style scoped lang='less'>
</style>

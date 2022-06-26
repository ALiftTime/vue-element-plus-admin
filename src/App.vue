<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 17:24:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 16:42:06
-->
<template>
  <ConfigGlobal />
</template>

<script setup>
import { onMounted } from 'vue'
import ConfigGlobal from '@/views/components/ConfigGlobal'
import { netWork } from './utils/netWork'

onMounted(() => {
  netWork()
})
</script>

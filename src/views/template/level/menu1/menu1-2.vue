<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 10:34:20
 * @LastEditors: BG
 * @LastEditTime: 2022-06-22 13:54:18
-->
<template>
  <div>
    <p>menu1-2: 滚动测试</p>
    <div v-for="item in 100" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu12',
}
</script>

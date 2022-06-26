<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 10:33:40
 * @LastEditors: BG
 * @LastEditTime: 2022-06-21 14:45:53
-->
<template>
  <div>
    menu2
    <h2>num1:  {{ num1 }}</h2>
    <h2>num2:  {{ num2 }}</h2>
    <p>
      <el-button @click="onChange">
        改变num 1
      </el-button>
    </p>
    <p>
      <el-button @click="onChangeNum2">
        改变num 2
      </el-button>
    </p>
  </div>
</template>

<!-- <script>
export default {
  name: 'Menu2',
}
</script> -->
<script setup>
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useGlobalTools } from '@/utils/global_tools'
import { ref } from 'vue'
import { num2, onChangeNum2 } from './index'

// eslint-disable-next-line camelcase
const { gSetTimer } = useGlobalTools()
const { loadStart, loadDone } = usePageLoading()
loadStart()
gSetTimer(() => {
  loadDone()
}, 1000)
const num1 = ref(0)

const onChange = () => {
  num1.value = num1.value + num2.value
}


</script>


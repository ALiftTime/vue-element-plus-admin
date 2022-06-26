<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 10:35:15
 * @LastEditors: BG
 * @LastEditTime: 2022-06-26 10:47:11
-->
<template>
  <div>
    <div>menu1-1-1</div>
    <ContentWrap title="改变布局">
      <div>
        <el-button @click="onChangeLayout('classic')">
          经典布局
        </el-button>
        <el-button @click="onChangeLayout('classicTop')">
          顶部布局
        </el-button>
        <el-button @click="onChangeLayout('dual')">
          双菜单布局
        </el-button>
        <el-button @click="onGreyMode">
          悼念日
        </el-button>
      </div>
    </ContentWrap>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/modules/app'
import ContentWrap from '@/views/components/ContentWrap'

const onChangeLayout = (layout) => {
  useAppStore().setLayout(layout)
}
const onGreyMode = () => {
  useAppStore().setGreyMode(!useAppStore().getGreyMode)
}
</script>

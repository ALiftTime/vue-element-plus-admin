<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-11 09:23:21
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:02:32
-->
<script setup>
import { computed, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import PageFooter from '../Widget/pageFooter'


const appStore = useAppStore()
const layout = computed(() => appStore.getLayout)
const fixedHeader = computed(() => appStore.getFixedHeader)
const footer = computed(() => appStore.getFooter)

const contentClass = computed(() => {
  var str = 'content'
  switch (unref(layout)) {
    case 'classic':
      if (!fixedHeader.value) str += '_fixed'
      if (footer.value) str += '_footer'
      return str
    case 'classicTop':
      if (!fixedHeader.value && !footer.value) {
        str = 'content_fixed'
      } else if (!fixedHeader.value && footer.value) {
        str = 'content_fixed_footer'
      } else if (fixedHeader.value && footer.value) {
        str = 'content_fixed_footer'
      } else if (fixedHeader.value && !footer.value) {
        str = 'content_fixed'
      }
      return str
    case 'dual':
      if (!fixedHeader.value) str += '_tag'
      if (footer.value) str += '_footer'
      return str
    default:
      return str
  }
})

</script>

<template>
  <section
    :class="[
      'p-[var(--app-content-padding)] w-[100%] bg-[var(--app-contnet-bg-color)] dark:bg-[var(--el-bg-color)]',
      contentClass
    ]"
  >
    <router-view>
      <template #default="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </template>
    </router-view>
  </section>
  <PageFooter v-if="footer" />
</template>

<style  scoped lang='less'>
.content{
  min-height: 100%;
  &_tag{
    min-height: calc( 100% - var(--tags-view-height) );
  }
  &_tool{
    min-height: calc( 100% - var(--top-tool-height) )
  }
  &_footer{
    min-height: calc( 100% - var(--app-footer-height) );
  }
  &_fixed{
    min-height: calc( 100% - var(--tags-view-height) - var(--top-tool-height) );
  }
  &_fixed_footer{
    min-height: calc( 100% - var(--tags-view-height) - var(--top-tool-height) - var(--app-footer-height) );
  }
  &_tag_footer{
    min-height: calc( 100% - var(--tags-view-height) - var(--app-footer-height) );
  }
  &_tool_footer{
    min-height: calc( 100% - var(--top-tool-height) - var(--app-footer-height) );
  }
}
</style>

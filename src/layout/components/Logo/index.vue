<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-07 18:24:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-26 10:33:52
-->
<template>
  <router-link
    :class="[
      prefixCls,
      layout !== 'classic' ? `${prefixCls}__Top` : '',
      'flex !h-[var(--logo-height)] items-center cursor-pointer pl-8px relative',
      'dark:bg-[var(--el-bg-color)]'
    ]"
    to="/"
  >
    <img
      src="@/assets/imgs/logo.png"
      class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
    >
    <div
      v-if="show"
      :class="[
        'ml-10px',
        {
          'text-[var(--logo-title-text-color)]': layout === 'classic',
          'text-[var(--top-header-text-color)]':
            layout === 'topLeft' || layout === 'top' || layout === 'cutMenu'
        }
      ]"
    >
      ElementAdmin
    </div>
  </router-link>
</template>

<script setup>
import { ref, watch, computed, onMounted, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'


const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('logo')
const appStore = useAppStore()

const show = ref(true)

const layout = computed(() => appStore.getLayout)
const collapse = computed(() => appStore.getCollapse)

onMounted(() => {
  if (unref(collapse)) show.value = false
})

watch(
  () => collapse.value,
  (collapse) => {
    if (unref(layout) === 'topLeft' || unref(layout) === 'cutMenu') {
      show.value = true
      return
    }
    if (!collapse) {
      setTimeout(() => {
        show.value = !collapse
      }, 400)
    } else {
      show.value = !collapse
    }
  }
)

watch(
  () => layout.value,
  (layout) => {
    if (layout === 'top' || layout === 'cutMenu') {
      show.value = true
    } else {
      if (unref(collapse)) {
        show.value = false
      } else {
        show.value = true
      }
    }
  }
)
</script>

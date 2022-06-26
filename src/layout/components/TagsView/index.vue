<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-17 20:08:29
 * @LastEditors: BG
 * @LastEditTime: 2022-06-20 10:57:55
-->
<template>
  <div
    :id="prefixCls"
    :class="prefixCls"
    class="flex w-full relative bg-[#fff] dark:bg-[var(--el-bg-color)]"
  >
    <div class="overflow-hidden flex-1 h-[var(--tags-view-height)] px-4">
      <ElScrollbar ref="scrollbarRef" class="h-full" @scroll="scroll">
        <div class="flex h-full">
          <ContextMenu
            v-for="item in visitedViews"
            :ref="itemRefs.set"
            :key="item.fullPath"
            :schema="getMenuFunList(item)"
            :tag-item="item"
            :class="[
              `${prefixCls}__item`,
              item?.meta?.affix ? `${prefixCls}__item--affix` : '',
              {
                'is-active': isActive(item)
              }
            ]"
            @visible-change="visibleChange"
          >
            <div>
              <router-link :ref="tagLinksRefs.set" v-slot="{ navigate }" :to="{ ...item }" custom>
                <div
                  class="h-full flex justify-center items-center whitespace-nowrap pl-15px"
                  @click="navigate"
                >
                  <IconEp
                    v-if="
                      item?.matched &&
                        item?.matched[1] &&
                        item?.matched[1]?.meta?.icon &&
                        tagsViewIcon
                    "
                    :icon="item?.matched[1]?.meta?.icon"
                    :size="12"
                    class="mr-5px"
                  />
                  {{ item?.meta?.title }}
                  <IconEp
                    :class="`${prefixCls}__item--close`"
                    icon="close"
                    :size="12"
                    @click.prevent.stop="closeSelectedTag(item)"
                  />
                </div>
              </router-link>
            </div>
          </ContextMenu>
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, unref, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateRefsList } from '@vueuse/core'
import ContextMenu from '../ContextMenu'
import { initRouter, initTags, addTags, closeSelectedTag, isActive, getMenuFunList } from './helperTag'

import { useTagsViewStore } from '@/store/modules/tagsView'
import { useDesign } from '@/hooks/web/useDesign'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import IconEp from '@/plugins/elementPlus/icon-ep.vue'


const { currentRoute } = useRouter()
initRouter(useRouter)

const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.getVisitedViews)
// const tagsViewIcon = computed(() => appStore.getTagsViewIcon)

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('tags-view')

/* 滚动 */
const tagLinksRefs = useTemplateRefsList() // 难道是我这边刷新页面了
// 所有右键菜单组件的元素
const itemRefs = useTemplateRefsList()
// elscroll 实例
const scrollbarRef = ref()
// 保存滚动位置
const scrollLeftNumber = ref(0)

const moveToCurrentTag = async() => {
  await nextTick()
  for (const v of unref(visitedViews)) {
    if (v.fullPath === unref(currentRoute).path) {
      moveToTarget(v)
      if (v.fullPath !== unref(currentRoute).fullPath) {
        tagsViewStore.updateVisitedView(unref(currentRoute))
      }
      break
    }
  }
}
const moveToTarget = (currentTag) => {
  const wrap$ = unref(scrollbarRef)?.wrap$
  let firstTag = null
  let lastTag = null
  const tagList = unref(tagLinksRefs)
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }
  if (firstTag?.to.fullPath === currentTag.fullPath) {
    // 直接滚动到 0 的位置
    const { start } = useScrollTo({
      el: wrap$,
      position: 'scrollLeft',
      to: 0,
      duration: 500
    })
    start()
  } else if (lastTag?.to.fullPath === currentTag.fullPath) {
    // 滚动到最后的位置
    const { start } = useScrollTo({
      el: wrap$,
      position: 'scrollLeft',
      to: wrap$.scrollWidth - wrap$.offsetWidth,
      duration: 500
    })
    start()
  } else {
    const currentIndex = tagList.findIndex((item) => item?.to.fullPath === currentTag.fullPath)
    const tagsRefs = document.getElementsByClassName(`${prefixCls}__item`)
    const prevTag = tagsRefs[currentIndex - 1]
    const nextTag = tagsRefs[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + 4
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - 4
    if (afterNextTagOffsetLeft > unref(scrollLeftNumber) + wrap$.offsetWidth) {
      const { start } = useScrollTo({
        el: wrap$,
        position: 'scrollLeft',
        to: afterNextTagOffsetLeft - wrap$.offsetWidth,
        duration: 500
      })
      start()
    } else if (beforePrevTagOffsetLeft < unref(scrollLeftNumber)) {
      const { start } = useScrollTo({
        el: wrap$,
        position: 'scrollLeft',
        to: beforePrevTagOffsetLeft,
        duration: 500
      })
      start()
    }
  }
}
// 右键菜单装填改变的时候
const visibleChange = (visible, tagItem) => {
  if (visible) {
    for (const v of unref(itemRefs)) {
      const elDropdownMenuRef = v.elDropdownMenuRef
      if (tagItem.fullPath !== v.tagItem.fullPath) {
        elDropdownMenuRef?.handleClose()
      }
    }
  }
}
const scroll = ({ scrollLeft }) => {
  scrollLeftNumber.value = scrollLeft
}
// 移动到某个位置
// const move = (to) => {
//   const wrap$ = unref(scrollbarRef)?.wrap$
//   const { start } = useScrollTo({
//     el: wrap$,
//     position: 'scrollLeft',
//     to: unref(scrollLeftNumber) + to,
//     duration: 500
//   })
//   start()
// }

onMounted(() => {
  initTags()
  addTags()
})
watch(
  () => currentRoute.value,
  () => {
    addTags()
    moveToCurrentTag()
    tagLinksRefs.value.length = 0
    itemRefs.value.length = 0
  }
)
</script>


<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tags-view';
.@{prefix-cls} {
  :deep(.@{elNamespace}-scrollbar__view) {
    height: 100%;
  }

  &__tool {
    position: relative;

    &:hover {
      :deep(span) {
        color: var(--el-color-black) !important;
      }
    }

    &:after {
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      height: calc(~'100% - 1px');
      border-right: 1px solid var(--tags-view-border-color);
      border-left: 1px solid var(--tags-view-border-color);
      content: '';
    }
  }

  &__item + &__item {
    margin-left: 4px;
  }

  &__item {
    position: relative;
    top: 2px;
    height: calc(~'100% - 4px');
    padding-right: 25px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #d9d9d9;

    &--close {
      position: absolute;
      top: 50%;
      right: 5px;
      display: none;
      transform: translate(0, -50%);
    }
    &:not(.@{prefix-cls}__item--affix):hover {
      .@{prefix-cls}__item--close {
        display: block;
      }
    }
  }

  &__item:not(.is-active) {
    &:hover {
      color: var(--el-color-primary);
    }
  }

  &__item.is-active {
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
    .@{prefix-cls}__item--close {
      :deep(span) {
        color: var(--el-color-white) !important;
      }
    }
  }
}

.dark {
  .@{prefix-cls} {
    &__tool {
      &:hover {
        :deep(span) {
          color: #fff !important;
        }
      }

      &:after {
        border-right: 1px solid var(--el-border-color);
        border-left: 1px solid var(--el-border-color);
      }
    }

    &__item {
      position: relative;
      top: 2px;
      height: calc(~'100% - 4px');
      padding-right: 25px;
      font-size: 12px;
      cursor: pointer;
      border: 1px solid var(--el-border-color);
    }

    &__item:not(.is-active) {
      &:hover {
        color: var(--el-color-primary);
      }
    }

    &__item.is-active {
      color: var(--el-color-white);
      background-color: var(--el-color-primary);
      .@{prefix-cls}__item--close {
        :deep(span) {
          color: var(--el-color-white) !important;
        }
      }
    }
  }
}
</style>

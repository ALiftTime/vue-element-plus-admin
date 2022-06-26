<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-10 16:48:12
 * @LastEditors: BG
 * @LastEditTime: 2022-06-22 17:10:22
-->
<script lang="jsx">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'


import Collapse from '../Widget/collapse'
import SizeStyleChang from '../Widget/sizeStyleChang'
import UserInfo from '../Widget/userInfo'
import Screenfull from '../Widget/screenfull'
import Breadcrumb from '../Widget/breadcrumb/index'

const { getPrefixCls, variables } = useDesign()
const prefixCls = getPrefixCls('tool-header')
const appStore = useAppStore()

const hamburger = computed(() => appStore.getHamburger) // 折叠图标

export default defineComponent({
  name: 'ToolHeader',
  setup() {
    return () => (
      <div
        id={`${variables.namespace}-tool-header`}
        class={[
          prefixCls,
          'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
          'dark:(bg-[var(--el-bg-color)]'
        ]}
      >
        <div class='h-full flex items-center'>
          {hamburger.value ? (
            <Collapse class='hover-tigger' color='var(--top-header-text-color)'></Collapse>
          ) : undefined}
          <Breadcrumb class='<md:hidden'></Breadcrumb>
        </div>
        <div class='h-full flex items-center'>
          <Screenfull class='hover-tigger' color='var(--top-header-text-color)'></Screenfull>
          <SizeStyleChang class='hover-tigger' color='var(--top-header-text-color)'></SizeStyleChang>
          <UserInfo class='hover-tigger'></UserInfo>
        </div>
      </div>
    )
  }
})

</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tool-header';

.@{prefix-cls} {
  transition: left var(--transition-time-02);
}
</style>

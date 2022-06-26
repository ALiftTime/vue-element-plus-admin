<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-08 17:53:31
 * @LastEditors: BG
 * @LastEditTime: 2022-06-08 18:28:58
-->
<template>
  <ErrorTemplate type="404" @error-click="errorClick" />
</template>

<script>
import ErrorTemplate from './template'
// import { usePermissionStore } from '@/store/modules/permission'

export default {
  name: '404Page',
  components: { ErrorTemplate },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    errorClick(type) {
      console.log('🚀 ~ file: 404.vue ~ line 28 ~ type', type)
      // const permissionStore = usePermissionStore()
      // this.$router.push(permissionStore.addRouters[0]?.path)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang='less'>
</style>


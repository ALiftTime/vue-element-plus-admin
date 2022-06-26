<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-20 14:32:27
 * @LastEditors: BG
 * @LastEditTime: 2022-06-20 17:23:54
-->
<template>
  <div class="emtryTest">
    emtryTest~
    <p>价格: {{ g_transferredNumber(10) }}</p>
  </div>
</template>

<script>
import { usePageLoading } from '@/hooks/web/usePageLoading'

export default {
  name: 'EmtryTest',
  data() {
    return {
    }
  },
  created() {
    this.test()
  },
  methods: {
    test() {
      const { loadStart, loadDone } = usePageLoading()
      loadStart()
      this.g_setTimer(() => {
        loadDone()
      })
    },
    globalTools() {
      /* ---------- setTimer -----------*/
      // this.g_setTimer(() => {
      //   alert('11111111111')
      // }, 1000)
      // this.g_setTimer(() => {
      //   alert('22222222222')
      // }, 1000)
      /* ---------- Storage -----------*/
      // this.g_setStorage('LOGIN_INFO', '11111111111')
      // console.log(this.g_getStorage('LOGIN_INFO'))
      // console.log(this.g_removeStorage('LOGIN_INFO'))
      // this.g_jump('/login')
      /* ---------- 交互 -----------*/
      // this.g_showMsg('你好呀')
      // this.g_showLoading()
      // this.g_setTimer(() => {
      //   this.g_hideLoading()
      // }, 1000)
      // this.g_showModel('是先有鸡吗?', '提示', 'info').then(res => {
      //   console.log('是的', res)
      // }, err => {
      //   console.log('不是', err)
      // })
      // this.g_alertBox('你好').then(res => {
      //   console.log('点击了确定按钮', res)
      // })
      /* ---------- 获取当前时间 -----------*/
      // console.log(this.g_getDate())
      // console.log(this.g_CONST.LOGIN_INFO)
      /* ---------- BusEvent -----------*/
      this.g_busEvent.on('test', () => {
        console.log('第一次监听')
      })
      this.g_busEvent.on('test', () => {
        console.log('第二次监听')
      })
      this.g_busEvent.emit('test')
      this.g_busEvent.emit('test')
    },
  }
}
</script>

<style scoped lang='less'>
</style>

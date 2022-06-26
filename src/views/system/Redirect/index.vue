<!--
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-20 11:09:01
 * @LastEditors: BG
 * @LastEditTime: 2022-06-23 16:44:12
-->
<template>
  <div />
</template>
<script setup>
import { unref } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute, replace } = useRouter()

const { params, query } = unref(currentRoute)
const path = params.path
const RedirectType = params._redirect_type || 'path'


Reflect.deleteProperty(params, '_redirect_type')
Reflect.deleteProperty(params, 'path')

const _path = Array.isArray(path) ? path.join('/') : path

if (RedirectType === 'name') {
  replace({
    name: _path,
    query,
    params
  })
} else {
  replace({
    path: _path.startsWith('/') ? _path : '/' + _path,
    query
  })
}
</script>

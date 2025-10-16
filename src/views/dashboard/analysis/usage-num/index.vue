<template>
  <n-grid :cols="4" :x-gap="12">
    <n-gi v-for="(item, index) of data" :key="index">
      <box-item v-bind="item" />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { BoxItem } from './components'
import { IconUser, IconVisit, IconDownload, IconApply } from './icons'
import type { DataItem } from './typings'

const data: DataItem[] = [
  { title: '用户量', num: 2125, increment: 3, color: '#416ff8', icon: IconUser },
  { title: '访问量', num: 25210, increment: -2, color: '#f57855', icon: IconVisit },
  { title: '下载量', num: 36555, increment: 5, color: '#21b984', icon: IconDownload },
  { title: '使用量', num: 28675, increment: 5, color: '#f59d2d', icon: IconApply }
]
</script>

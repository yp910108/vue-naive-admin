<template>
  <n-grid cols="1 520:2 800:3 1080:4" :x-gap="12" :y-gap="12">
    <n-gi v-for="(item, index) of options" :key="index">
      <box-item v-bind="item" />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { BackendData, DataItem } from './typings'
import { BoxItem } from './components'
import { IconUser, IconVisit, IconDownload, IconApply } from './icons'
import { fetchData } from './service'

const data = ref<BackendData>()

const setData = async () => {
  const res = await fetchData()
  data.value = res
}

onMounted(setData)

const options = computed<DataItem[]>(() => {
  const { user, visit, download, apply } = data.value ?? {}
  return [
    {
      title: '用户量',
      num: user?.num ?? 0,
      increment: user?.increment ?? 0,
      color: '#416ff8',
      icon: IconUser
    },
    {
      title: '访问量',
      num: visit?.num ?? 0,
      increment: visit?.increment ?? 0,
      color: '#21b984',
      icon: IconVisit
    },
    {
      title: '下载量',
      num: download?.num ?? 0,
      increment: download?.increment ?? 0,
      color: '#f59d2d',
      icon: IconDownload
    },
    {
      title: '使用量',
      num: apply?.num ?? 0,
      increment: apply?.increment ?? 0,
      color: '#f57855',
      icon: IconApply
    }
  ]
})
</script>

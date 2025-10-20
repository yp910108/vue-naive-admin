<template>
  <div>
    <n-card :title="route.meta.title" :bordered="false" size="small" class="b-rd-8px shadow-sm">
      <n-button @click="handleToTabDetail">跳转详情</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { uniqueId } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '@/store'

const route = useRoute()

const router = useRouter()

const routeStore = useRouteStore()

const handleToTabDetail = () => {
  const name = uniqueId()
  const path = `${route.path}/${name}`
  routeStore.addLocalRoute({
    title: `动态页签-${name}`,
    path,
    page: 'tabs/dynamic-detail',
    activeMenu: route.path
  })
  router.push(path)
}
</script>

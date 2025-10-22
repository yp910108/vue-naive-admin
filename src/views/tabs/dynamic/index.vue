<template>
  <div>
    <n-card :title="route.meta.title" :bordered="false" size="small" class="b-rd-8px shadow-sm">
      <n-grid :cols="5" :x-gap="12" :y-gap="12">
        <n-gi v-for="i of 50" :key="i">
          <n-button secondary block @click="handleToDetail(i)">/dynamic/{{ i }}</n-button>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '@/store'

const route = useRoute()

const router = useRouter()

const routeStore = useRouteStore()

const handleToDetail = (i: number) => {
  const path = `${route.path}/${i}`
  routeStore.addLocalRoute({
    title: `动态页签-${i}`,
    path,
    page: 'tabs/dynamic-detail',
    activeMenu: route.path
  })
  router.push(path)
}
</script>

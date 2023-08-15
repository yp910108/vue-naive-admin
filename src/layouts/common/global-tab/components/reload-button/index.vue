<template>
  <hover-container
    class="w-64px h-full"
    tooltip-content="重新加载"
    placement="bottom-end"
    @click="handleRefresh"
  >
    <icon-refresh class="text-22px" :class="{ 'animate-spin': loading }" />
  </hover-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore, useRouteStore } from '@/store'
import { useLoading } from '@/hooks'
defineOptions({ name: 'ReloadButton' })

const app = useAppStore()
const routeStore = useRouteStore()
const route = useRoute()
const { loading, startLoading, endLoading } = useLoading()

function handleRefresh() {
  const isCached = routeStore.cachedRoutes.includes(String(route.name))
  if (isCached) {
    routeStore.removeCachedRoute(route.name as AuthRoute.AllRouteKey)
  }
  startLoading()
  app.reloadPage()
  setTimeout(() => {
    if (isCached) {
      routeStore.addCachedRoute(route.name as AuthRoute.AllRouteKey)
    }
    endLoading()
  }, 1000)
}
</script>

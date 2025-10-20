<template>
  <n-flex vertical :size="0">
    <n-page-header class="shrink-0" @back="handleBack">
      <template #title>
        <n-h6 class="mb-0 text-20px">{{ route.meta.title }}</n-h6>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
    </n-page-header>
    <n-flex vertical class="grow-1 mt-10px h-0">
      <slot></slot>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/store'

const route = useRoute()

const router = useRouter()

const tabStore = useTabStore()

const handleBack = () => {
  const tab = tabStore.tabs.find(({ key }) => key === route.name)
  tabStore.removeTab(tab!)
  if (tab?.backRoutePath) {
    router.push(tab.backRoutePath)
  } else {
    router.push({ name: 'Root' })
  }
}
</script>

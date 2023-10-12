<template>
  <n-space vertical :size="16">
    <n-card title="Tab Detail" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space vertical :size="12">
        <div>当前路由的描述数据(meta)：</div>
        <div>{{ route.meta }}</div>
        <n-button @click="handleToTab">返回Tab</n-button>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function handleToTab() {
  router.back()
}

if (!route.query.name) {
  router.push({ name: 'Root' })
}
</script>

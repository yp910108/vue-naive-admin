<template>
  <n-space vertical :size="16">
    <n-card title="Tab Home" :bordered="false" size="small" class="rounded-8px shadow-sm">
      <n-space vertical :size="12">
        <n-button @click="handleToTabDetail">跳转Tab Detail</n-button>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleToTabDetail() {
  router.push({ name: 'FunctionTabDetail', query: { name: 'abc' }, hash: '#DEMO_HASH' })
}
</script>

<template>
  <div>
    <n-card :title="route.meta.title" :bordered="false" size="small" class="b-rd-8px shadow-sm">
      <n-button @click="handleToTabDetail">跳转详情</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const handleToTabDetail = () => {
  router.push({
    name: 'TabsStaticDetail',
    query: { name: 'abc' }
  })
}
</script>

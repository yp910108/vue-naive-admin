<template>
  <page-back>
    <n-card :title="route.meta.title" :bordered="false" size="small" class="b-rd-8px shadow-sm">
      <n-flex vertical :size="12">
        <div>当前路由的描述数据(meta)：</div>
        <div>{{ route.meta }}</div>
      </n-flex>
    </n-card>
  </page-back>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PageBack } from '@/components'

const route = useRoute()
</script>

<template>
  <div>
    this is analysis.
    <n-button type="primary" @click="handleClick">click</n-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleClick = () => {
  router.push('/dashboard/workbench')
}
</script>

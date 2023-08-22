<template>
  <app-content :show-padding="false" />
</template>

<script setup lang="ts">
import AppContent from '../components/app-content/index.vue'

defineOptions({ name: 'BlankLayout' })
</script>

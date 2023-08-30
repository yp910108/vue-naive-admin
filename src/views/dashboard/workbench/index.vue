<template>
  <n-space :vertical="true" :size="16">
    <workbench-header />
    <workbench-main />
  </n-space>
</template>

<script setup lang="ts">
import WorkbenchHeader from './header.vue'
import WorkbenchMain from './main/index.vue'
</script>

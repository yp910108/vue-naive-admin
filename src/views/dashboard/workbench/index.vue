<template>
  <n-space :vertical="true" :size="16">
    <workbench-header />
    <workbench-main />
  </n-space>
</template>

<script setup lang="ts">
import WorkbenchHeader from './workbench-header.vue'
import WorkbenchMain from './workbench-main/index.vue'
</script>

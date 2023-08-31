<template>
  <n-space vertical :size="16">
    <project-introduction />
    <project-info />
    <pro-dependency />
    <dev-dependency />
  </n-space>
</template>

<script setup lang="ts">
import DevDependency from './dev-dependency.vue'
import ProDependency from './pro-dependency.vue'
import ProjectInfo from './project-info.vue'
import ProjectIntroduction from './project-introduction.vue'
</script>

<style scoped></style>

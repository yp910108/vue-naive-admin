<template>
  <n-space vertical :size="16">
    <top-chart />
    <data-card />
    <bottom-part />
  </n-space>
</template>

<script lang="ts" setup>
import TopChart from './top-chart.vue'
import DataCard from './data-card/index.vue'
import BottomPart from './bottom-part.vue'
</script>

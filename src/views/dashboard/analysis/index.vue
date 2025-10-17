<template>
  <n-flex vertical :size="12">
    <usage-num />
    <usage-trend />
    <n-grid :cols="3" :x-gap="12">
      <n-gi :span="2">
        <n-flex vertical :size="12">
          <visit-source />
          <visit-way />
        </n-flex>
      </n-gi>
      <n-gi>
        <recent-news />
      </n-gi>
    </n-grid>
  </n-flex>
</template>

<script setup lang="ts">
import UsageNum from './usage-num/index.vue'
import UsageTrend from './usage-trend/index.vue'
import RecentNews from './recent-news/index.vue'
import VisitSource from './visit-source/index.vue'
import VisitWay from './visit-way/index.vue'
</script>

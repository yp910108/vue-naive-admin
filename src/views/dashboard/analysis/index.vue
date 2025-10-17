<template>
  <n-grid :cols="3" :x-gap="12">
    <n-gi :span="2">
      <n-flex vertical>
        <usage-num />
        <usage-trend />
        <n-grid :cols="2" :x-gap="12">
          <n-gi>
            <visit-source />
          </n-gi>
          <n-gi>
            <visit-way />
          </n-gi>
        </n-grid>
      </n-flex>
    </n-gi>
    <n-gi>
      <recent-news />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import UsageNum from './usage-num/index.vue'
import UsageTrend from './usage-trend/index.vue'
import RecentNews from './recent-news/index.vue'
import VisitSource from './visit-source/index.vue'
import VisitWay from './visit-way/index.vue'
</script>

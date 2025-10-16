<template>
  <n-card title="访问量和使用量趋势" class="h-350px">
    <template #header-extra>
      <n-tabs type="segment" animated size="small" class="w-100px">
        <n-tab-pane name="month" tab="月" />
        <n-tab-pane name="week" tab="周" />
      </n-tabs>
    </template>
    <chart :option="option" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { Chart, type ECOption } from '@/components'
import type { DataItem } from './typings'
import { fetchData } from './service'

const themeVars = useThemeVars()

const option = computed<ECOption>(() => {
  return {
    grid: {
      left: 30,
      top: 45,
      right: 15,
      bottom: 25
    },
    tooltip: {
      trigger: 'axis',
      borderWidth: 0,
      backgroundColor: themeVars.value.cardColor,
      axisPointer: {
        lineStyle: {
          type: [8, 5]
        }
      }
    },
    legend: {
      right: 10,
      top: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value?.map((item) => item.time)
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          width: 0.6
        }
      }
    },
    series: [
      {
        type: 'line',
        name: '访问量',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2
        },
        data: data.value?.map((item) => item.visitNum)
      },
      {
        type: 'line',
        name: '使用量',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2
        },
        data: data.value?.map((item) => item.applyNum)
      }
    ]
  } as ECOption
})

const loading = ref(false)

const data = ref<DataItem[]>()

const setData = async () => {
  try {
    loading.value = true
    const res = await fetchData()
    loading.value = false
    data.value = res
  } catch (e) {
    loading.value = false
  }
}

onMounted(setData)
</script>

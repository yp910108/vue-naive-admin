<template>
  <n-card
    title="访问量和使用量趋势"
    :bordered="false"
    class="h-395px shadow-[var(--shadow)]"
    :style="{
      '--shadow': '0 1px 2px rgb(0 21 41 / 8%)'
    }"
  >
    <template #header-extra>
      <n-tabs
        :value="type"
        type="segment"
        animated
        size="small"
        class="w-100px"
        @update:value="handleUpdateType"
      >
        <n-tab-pane name="month" tab="月" />
        <n-tab-pane name="day" tab="天" />
      </n-tabs>
    </template>
    <chart v-if="data?.length" :option="option" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { Chart, type ECOption } from '@/components'
import type { DataItem, Type } from './typings'
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
      axisLine: {
        lineStyle: {
          color: themeVars.value.borderColor
        }
      },
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
        name: '下载量',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2
        },
        data: data.value?.map((item) => item.downloadNum)
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

const type = ref<Type>('month')

const data = ref<DataItem[]>()

const setData = async () => {
  const res = await fetchData(type.value)
  data.value = res
}

const handleUpdateType = (newType: Type) => {
  type.value = newType
  data.value = undefined
  setData()
}

onMounted(setData)
</script>

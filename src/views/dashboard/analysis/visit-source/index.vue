<template>
  <n-card
    title="访问来源统计"
    :bordered="false"
    class="h-395px shadow-[var(--shadow)]"
    :style="{
      '--shadow': '0 1px 2px rgb(0 21 41 / 8%)'
    }"
  >
    <chart v-if="data" :option="option" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { Chart, chartColors, type ECOption } from '@/components'
import type { Data } from './typings'
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
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: themeVars.value.borderColor
        }
      },
      data: ['搜索引擎', '直接访问', '邮件营销', '联盟广告']
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          width: 0.6
        }
      }
    },
    series: {
      type: 'bar',
      barWidth: 35,
      data: [
        {
          value: data.value?.search,
          itemStyle: {
            color: chartColors[0]
          }
        },
        {
          value: data.value?.direct,
          itemStyle: {
            color: chartColors[1]
          }
        },
        {
          value: data.value?.email,
          itemStyle: {
            color: chartColors[2]
          }
        },
        {
          value: data.value?.adware,
          itemStyle: {
            color: chartColors[3]
          }
        }
      ]
    }
  } as ECOption
})

const data = ref<Data>()

const setData = async () => {
  const res = await fetchData()
  data.value = res
}

onMounted(setData)
</script>

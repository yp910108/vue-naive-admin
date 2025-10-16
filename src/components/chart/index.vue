<template>
  <div ref="chartRef" class="h-full"></div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts/core'
import type { ECElementEvent, EChartsType } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  MarkLineComponent,
  DataZoomComponent
} from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { useSettingsStore } from '@/store'
import type { ECOption } from './typings'
import { COLORS } from './constants'

echarts.use([
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  MarkLineComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  PieChart
])

interface Props {
  option: ECOption
}

const props = defineProps<Props>()

interface Emits {
  (e: 'resize'): void
  (e: 'legendselectchanged', legend: Record<string, boolean>): void
  (e: 'click', event: ECElementEvent): void
  (e: 'axis-click', dataIndex: number): void
  (e: 'series-click', seriesIndex: number, dataIndex: number): void
}

const emit = defineEmits<Emits>()

const settingsStore = useSettingsStore()

const chartRef = ref<HTMLElement>()

const option = computed(() => ({
  ...props.option,
  backgroundColor: 'transparent',
  color: COLORS
}))

let chart: EChartsType | null

const init = () => {
  chart?.off()
  chart?.dispose()
  chart = echarts.init(chartRef.value, settingsStore.theme === 'dark' ? 'dark' : 'light')
  chart?.setOption(option.value)
}

useResizeObserver(chartRef, ([entry]) => {
  const { height } = entry.contentRect
  if (!chart) {
    if (height) init()
  } else {
    chart.resize()
    emit('resize')
  }
})

watch(() => settingsStore.theme, init)

watch(option, () => {
  chart?.setOption(option.value)
})

onUnmounted(() => {
  chart?.dispose()
})

defineExpose({ el: () => chartRef.value })
</script>

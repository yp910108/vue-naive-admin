import { nextTick, effectScope, onScopeDispose, ref, watch, type ComputedRef, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useElementSize } from '@vueuse/core'
import * as echarts from 'echarts/core'
import {
  BarChart,
  GaugeChart,
  LineChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  type BarSeriesOption,
  type GaugeSeriesOption,
  type LineSeriesOption,
  type PictorialBarSeriesOption,
  type PieSeriesOption,
  type RadarSeriesOption,
  type ScatterSeriesOption
} from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  type DatasetComponentOption,
  type GridComponentOption,
  type LegendComponentOption,
  type TitleComponentOption,
  type ToolboxComponentOption,
  type TooltipComponentOption
} from 'echarts/components'
import { LabelLayout, LegacyGridContainLabel, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useThemeStore } from '@/store'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  LegacyGridContainLabel,
  UniversalTransition,
  CanvasRenderer
])

/**
 * Echarts hooks函数
 * @param options - 图表配置
 * @param renderFun - 图表渲染函数(例如：图表监听函数)
 * @description 按需引入图表组件，没注册的组件需要先引入
 */
export const useEcharts = (
  options: Ref<ECOption> | ComputedRef<ECOption>,
  renderFun?: (chartInstance: echarts.ECharts) => void
) => {
  const { theme } = storeToRefs(useThemeStore())

  const domRef = ref<HTMLElement>()

  const initialSize = { width: 0, height: 0 }

  const { width, height } = useElementSize(domRef, initialSize)

  let chart: echarts.ECharts | null = null

  const canRender = () => {
    return initialSize.width > 0 && initialSize.height > 0
  }

  const isRendered = () => {
    return Boolean(domRef.value && chart)
  }

  const update = (updateOptions: ECOption) => {
    if (isRendered()) {
      chart?.clear()
      chart!.setOption({ ...updateOptions, backgroundColor: 'transparent' })
    }
  }

  const render = async () => {
    if (domRef.value) {
      const chartTheme = theme.value.darkMode ? 'dark' : 'light'
      await nextTick()
      chart = echarts.init(domRef.value, chartTheme)
      if (renderFun) {
        renderFun(chart)
      }
      update(options.value)
    }
  }

  const resize = () => {
    chart?.resize()
  }

  const destroy = () => {
    chart?.dispose()
  }

  const updateTheme = () => {
    destroy()
    render()
  }

  const scope = effectScope()

  scope.run(() => {
    watch([width, height], ([newWidth, newHeight]) => {
      initialSize.width = newWidth
      initialSize.height = newHeight
      if (newWidth === 0 && newHeight === 0) {
        // 节点被删除 将 chart 置为空
        chart = null
      }
      if (canRender()) {
        if (!isRendered()) {
          render()
        } else {
          resize()
        }
      }
    })

    watch(options, update, { deep: true })

    watch(() => theme.value.darkMode, updateTheme)
  })

  onScopeDispose(() => {
    destroy()
    scope.stop()
  })

  return { domRef }
}

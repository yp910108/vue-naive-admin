import type { ComposeOption } from 'echarts/core'
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
  MarkLineComponentOption,
  DataZoomComponentOption
} from 'echarts/components'
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'

export type ECOption = ComposeOption<
  | GridComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | MarkLineComponentOption
  | DataZoomComponentOption
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
>

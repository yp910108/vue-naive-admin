import type { TableExcludeAttrs, TableSize } from './typings'

export const tableSizeOptions: { key: TableSize; label: string }[] = [
  { key: 'small', label: '紧凑' },
  { key: 'medium', label: '中等' },
  { key: 'large', label: '宽松' }
]

const tableExcludeAttrs: Record<keyof TableExcludeAttrs, undefined> = {
  size: undefined,
  loading: undefined,
  pagination: undefined
}
export const tableExcludeAttrKeys = ['class', 'style', ...Object.keys(tableExcludeAttrs)]

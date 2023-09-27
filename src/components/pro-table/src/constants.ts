import type { TableExcludeAttrs } from './typings'

const tableExcludeAttrs: Record<keyof TableExcludeAttrs, undefined> = {
  size: undefined,
  loading: undefined,
  pagination: undefined
}
export const tableExcludeAttrKeys = ['class', 'style', ...Object.keys(tableExcludeAttrs)]

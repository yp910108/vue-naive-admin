import type { TableExcludeAttrs } from './typings'

const TABLE_EXCLUDE_ATTR: Record<keyof TableExcludeAttrs, undefined> = {
  size: undefined,
  loading: undefined,
  pagination: undefined
}
export const tableExcludeAttrKeys = ['class', 'style', ...Object.keys(TABLE_EXCLUDE_ATTR)]

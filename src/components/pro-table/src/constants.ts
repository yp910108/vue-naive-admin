import type { TableExcludeAttrs } from './typings'

const TABLE_EXCLUDE_ATTRS: Record<keyof TableExcludeAttrs, undefined> = {
  size: undefined,
  loading: undefined,
  pagination: undefined
}
export const tableExcludeAttrsKeys = ['class', 'style', ...Object.keys(TABLE_EXCLUDE_ATTRS)]

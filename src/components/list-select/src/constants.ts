import type { SelectExcludeAttrs } from './typings'

const SELECT_EXCLUDE_ATTRS: Record<SelectExcludeAttrs, undefined> = {
  value: undefined,
  multiple: undefined,
  tag: undefined,
  show: undefined,
  'onUpdate:show': undefined,
  onUpdateShow: undefined,
  onUpdateValue: undefined,
  'onUpdate:value': undefined
}
export const selectExcludeAttrsKeys = Object.keys(SELECT_EXCLUDE_ATTRS)

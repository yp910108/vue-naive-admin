import type { SelectProps } from 'naive-ui'

export type SelectExcludeAttrs =
  | 'value'
  | 'multiple'
  | 'tag'
  | 'show'
  | 'onUpdate:show'
  | 'onUpdateShow'
  | 'onUpdate:value'
  | 'onUpdateValue'
export type SelectAttrs = Omit<SelectProps, SelectExcludeAttrs>

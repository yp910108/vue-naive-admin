import type { ModalProps } from 'naive-ui'

export type ProTableExcludeAttrs =
  | 'checkedRowKeys'
  | 'onUpdate:checkedRowKeys'
  | 'onUpdateCheckedRowKeys'

export type ModalExcludeAttrs = 'show' | 'onUpdate:show' | 'onUpdateShow' | 'onAfterLeave'
export type ModalAttrs = Omit<ModalProps, ModalExcludeAttrs>

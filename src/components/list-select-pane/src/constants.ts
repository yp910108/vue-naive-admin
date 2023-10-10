import type { ProTableExcludeAttrs, ModalExcludeAttrs } from './typings'

const PRO_TABLE_EXCLUDE_ATTRS: Record<ProTableExcludeAttrs, undefined> = {
  checkedRowKeys: undefined,
  'onUpdate:checkedRowKeys': undefined,
  onUpdateCheckedRowKeys: undefined
}
export const proTableExcludeAttrsKeys = [
  'rowKey',
  'onAfterRequest',
  ...Object.keys(PRO_TABLE_EXCLUDE_ATTRS)
]

const MODAL_EXCLUDE_ATTRS: Record<ModalExcludeAttrs, undefined> = {
  show: undefined,
  'onUpdate:show': undefined,
  onUpdateShow: undefined,
  onAfterLeave: undefined
}
export const modalExcludeAttrsKeys = Object.keys(MODAL_EXCLUDE_ATTRS)

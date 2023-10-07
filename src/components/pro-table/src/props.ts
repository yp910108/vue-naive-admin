import type { PropType, VNodeChild } from 'vue'
import type { RenderSearchActionParams } from './typings'

type SearchAction = boolean | ((searchActionParams: RenderSearchActionParams) => VNodeChild)

export const searchAction = {
  type: [Boolean, Function] as PropType<SearchAction>,
  default: true
}

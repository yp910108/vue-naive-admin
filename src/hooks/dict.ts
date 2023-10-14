import { ref, toRef } from 'vue'
import { mockRequest } from '@/utils'

export interface DictEnum {
  /**
   * 性别
   * - 1 男
   * - 2 女
   */
  sex: '1' | '2'
  /**
   * 政治面貌
   * - 1 党员
   * - 2 团员
   * - 3 群众
   */
  politics: '1' | '2' | '3'
}

type DictType = keyof DictEnum

interface DictItem {
  value: string
  label: string
}

type Dict = {
  [type in DictType]?: DictItem[]
}

function fetchDict(type: DictType) {
  return mockRequest.get<DictItem[]>(`/dict/${type}`, { params: { type } })
}

const dict = ref<Dict>({})
const existKeys: string[] = []

export function useDict(type: DictType) {
  if (!dict.value[type] && !existKeys.includes(type)) {
    existKeys.push(type)
    fetchDict(type).then((res) => {
      dict.value[type] = res
    })
  }

  return toRef(dict.value, type)
}

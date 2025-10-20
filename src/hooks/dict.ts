import { ref, toRef } from 'vue'
import { mockRequest } from '@/utils'

const fetchDict = (type: keyof Dict.Type) => {
  return mockRequest.get<Dict.Item[]>('/dict', { params: { type } })
}

const dict = ref<Dict.Data>({})

const existKeys: string[] = []

export const useDict = (type: keyof Dict.Type) => {
  if (!dict.value[type] && !existKeys.includes(type)) {
    existKeys.push(type)
    fetchDict(type).then((res) => {
      dict.value[type] = res
    })
  }
  return toRef(dict.value, type)
}

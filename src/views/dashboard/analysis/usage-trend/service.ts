import { mockRequest } from '@/utils'
import type { Type, DataItem } from './typings'

export const fetchData = (type: Type) => {
  return mockRequest.get<DataItem[]>('/dashboard/analysys/usage-trend', {
    params: { type }
  })
}

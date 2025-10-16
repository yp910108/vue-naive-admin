import { mockRequest } from '@/utils'
import type { DataItem } from './typings'

export const fetchData = () => {
  return mockRequest.get<DataItem[]>('/dashboard/analysys/recent-news')
}

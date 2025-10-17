import { mockRequest } from '@/utils'
import type { Data } from './typings'

export const fetchData = () => {
  return mockRequest.get<Data>('/dashboard/analysys/visit-way')
}

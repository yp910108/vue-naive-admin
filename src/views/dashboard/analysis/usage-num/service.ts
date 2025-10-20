import { mockRequest } from '@/utils'
import type { BackendData } from './typings'

export const fetchData = () => {
  return mockRequest.get<BackendData>('/dashboard/analysys/usage-num')
}

import { mockRequest } from '@/utils'
import type { FetchListParams, Row } from './typings'

export function fetchList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/users', { params })
}

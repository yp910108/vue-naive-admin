import { mockRequest } from '@/utils'
import type { FetchListParams, RowData } from './typings'

export function fetchList(params: FetchListParams) {
  return mockRequest.get<RowData[]>('/function/table', { params })
}

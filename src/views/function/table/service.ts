import { mockRequest } from '@/utils'
import type { FetchListParams, RowData } from './typings'

export function fetchList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: RowData[] }>('/function/table', { params })
}

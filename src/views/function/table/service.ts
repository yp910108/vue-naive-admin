import { mockRequest } from '@/utils'
import type { Politics, RowData, Sex } from './typings'

interface FetchListParams {
  name?: string
  sex?: Sex
  age?: number
  startBirthDate?: string
  endBirthDate?: string
  politics?: Politics
  addressId?: string
  deptId?: string
  page: number
  pageSize: number
}

export function fetchList(params: FetchListParams) {
  return mockRequest.get<RowData[]>('/function/table', { params })
}

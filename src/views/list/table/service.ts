import { mockRequest } from '@/utils'
import type { BackendModel, FetchListParams, Row } from './typings'

export function fetchUserList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/list/table-users', { params })
}

export function fetchList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/list/table', { params })
}

export function fetchDetail(id: number) {
  return mockRequest.get<Row>(`/list/table/${id}`)
}

export function add(data: BackendModel) {
  return mockRequest.post('/list/table', data)
}

export function edit(id: number, data: BackendModel) {
  return mockRequest.patch(`/list/table/${id}`, data)
}

export function deleteItem(id: number) {
  return mockRequest.delete(`/list/table/${id}`)
}

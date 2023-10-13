import { mockRequest } from '@/utils'
import type { FetchListParams, Model, Row } from './typings'

export function fetchUserList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/function/table-users', { params })
}

export function fetchList(params: FetchListParams) {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/function/table', { params })
}

export function fetchDetail(id: number) {
  return mockRequest.get<Row>(`/function/table/${id}`)
}

export function add(data: Model) {
  return mockRequest.post('/function/table', data)
}

export function edit(id: number, data: Model) {
  return mockRequest.patch(`/function/table/${id}`, data)
}

export function deleteItem(id: number) {
  return mockRequest.delete(`/function/table/${id}`)
}

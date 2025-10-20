import { mockRequest } from '@/utils'
import type { BackendModel, FetchListParams, Row } from './typings'

export const fetchList = (params: FetchListParams) => {
  return mockRequest.get<{ total?: number; list?: Row[] }>('/list/table', { params })
}

export const fetchDetail = (id: number) => {
  return mockRequest.get<Row>(`/list/table/${id}`)
}

export const add = (data: BackendModel) => {
  return mockRequest.post('/list/table', data)
}

export const edit = (id: number, data: BackendModel) => {
  return mockRequest.patch(`/list/table/${id}`, data)
}

export const deleteItem = (id: number) => {
  return mockRequest.delete(`/list/table/${id}`)
}

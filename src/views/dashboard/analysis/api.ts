import { mockRequest } from '@/service/request'

export function fetchList(params: any, data: any) {
  return mockRequest.post<{ x: string }[]>('/getList', data, { params })
}

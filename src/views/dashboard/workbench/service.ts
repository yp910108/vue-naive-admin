import { mockRequest } from '@/utils'

export function fetchData() {
  return mockRequest.get<string>('/test')
}

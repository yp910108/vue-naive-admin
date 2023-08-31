import { mockRequest } from '@/utils'
import type { Row } from './typing'

/**
 * 获取用户列表
 */
export function fetchUserList() {
  return mockRequest.post<Row[]>('/getAllUserList')
}

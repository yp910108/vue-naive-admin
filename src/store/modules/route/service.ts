import { mockRequest } from '@/utils'
import type { Route } from './typing'

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<Route[]>('/getUserRoutes', { userId })
}

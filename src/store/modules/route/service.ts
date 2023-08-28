import type { Route } from '@/router'
import { mockRequest } from '@/utils'

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<Route[]>('/getUserRoutes', { userId })
}

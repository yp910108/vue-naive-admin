import { mockRequest } from '@/utils'
import type { Route } from './typing'

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export function fetchAuthRoutes(userId: string) {
  return mockRequest.get<Route[]>('/getAuthRoutes', { params: { userId } })
}

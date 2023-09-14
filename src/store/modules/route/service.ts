import { mockRequest } from '@/utils'
import type { RouteData } from './typing'

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export function fetchAuthRoutes(userId: string) {
  return mockRequest.get<RouteData[]>('/getAuthRoutes', { params: { userId } })
}

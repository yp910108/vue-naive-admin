import { mockRequest } from '@/utils'

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export const fetchAuthRoutes = (userId: string) => {
  return mockRequest.get<Route.RouteData[]>('/getAuthRoutes', { params: { userId } })
}

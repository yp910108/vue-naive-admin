import { mockRequest } from '@/utils'

export const login = (userName: string, password: string) => {
  return mockRequest.post<string>('/login', { userName, password })
}

/**
 * 获取用户信息
 * @returns
 */
export const fetchUserInfo = () => {
  return mockRequest.get<Auth.UserInfo>('/getUserInfo')
}

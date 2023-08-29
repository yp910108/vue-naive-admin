import { mockRequest } from '@/utils'
import type { UserInfo } from './typing'

/**
 * 登录
 * @param userName
 * @param password
 * @returns
 */
export function login(userName: string, password: string) {
  return mockRequest.post<string>('/login', { userName, password })
}

/**
 * 获取用户信息
 * @returns
 */
export function fetchUserInfo() {
  return mockRequest.get<UserInfo>('/getUserInfo')
}

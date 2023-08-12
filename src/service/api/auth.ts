import { mockRequest } from '../request'

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回 boolean 值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone })
}

/**
 * 登录
 * @param userName
 * @param password
 * @returns
 */
export function fetchLogin(userName: string, password: string) {
  return mockRequest.post<ApiAuth.Token>('/login', { userName, password })
}

/**
 * 获取用户信息
 * @returns
 */
export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo')
}

/**
 * 获取用户路由数据
 * @param userId
 * @returns
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId })
}

/**
 * 刷新 token
 * @param refreshToken
 * @returns
 */
export function fetchUpdateToken(refreshToken: string) {
  return mockRequest.post<ApiAuth.Token>('/updateToken', { refreshToken })
}

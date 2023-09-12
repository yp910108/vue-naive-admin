import { mockRequest } from '@/utils'

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回 boolean 值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.get<boolean>('/getSmsCode', { params: { phone } })
}

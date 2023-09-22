export type ContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

export interface BackendConfig {
  codeKey: string
  dataKey: string
  messageKey: string
  successCode: number | string
}

/**
 * 请求的错误类型：
 * - http: 网络错误、请求超时、网关错误等
 * - backend: 请求成功，响应的 http 状态码为 200，由后端定义的业务错误
 */
type RequestErrorType = 'http' | 'backend'

export interface RequestError {
  type: RequestErrorType
  code: string | number
  message: string
}

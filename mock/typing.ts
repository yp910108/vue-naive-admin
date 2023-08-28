export interface MockServiceResult<T = any> {
  code: string | number
  data: T
  message: string
}

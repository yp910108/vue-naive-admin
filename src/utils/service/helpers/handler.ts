/**
 * 处理请求结果
 * @param error
 * @param data
 */
export function handleServiceResult<T = any>(
  error: Service.RequestError | null,
  data: any
): Service.RequestResult {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null
    }
    return fail
  }
  const success: Service.SuccessResult<T> = {
    error: null,
    data
  }
  return success
}

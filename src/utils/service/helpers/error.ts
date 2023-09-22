import type { AxiosError } from 'axios'
import type { RequestError } from '../typings'
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_MSG_DURATION,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_CANCELED_CODE,
  REQUEST_CANCELED_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG
} from '../constants'

const errorMsgStack = new Map<string | number, string>([]) // 错误消息栈，防止同一错误出现两次

function addErrorMsg(err: RequestError) {
  errorMsgStack.set(err.code, err.message)
}

function removeErrMsg(err: RequestError) {
  errorMsgStack.delete(err.code)
}

function hasErrorMsg(error: RequestError) {
  return errorMsgStack.has(error.code)
}

/**
 * 显示错误消息
 * @param error
 * @returns
 */
function showErrorMsg(error: RequestError) {
  if (!error.message || hasErrorMsg(error)) return

  addErrorMsg(error)
  console.warn(error.code, error.message)
  window.$message.error(error.message, { duration: ERROR_MSG_DURATION })
  setTimeout(() => {
    removeErrMsg(error)
  }, ERROR_MSG_DURATION)
}

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * 处理 axios 请求失败的错误
 * @param axiosError
 * @returns
 */
export function handleAxiosError(axiosError: AxiosError) {
  const error: RequestError = {
    type: 'http',
    code: DEFAULT_REQUEST_ERROR_CODE,
    message: DEFAULT_REQUEST_ERROR_MSG
  }

  if (
    // 网络错误
    !window.navigator.onLine ||
    axiosError.code === NETWORK_ERROR_CODE ||
    axiosError.message === 'Network Error'
  ) {
    error.code = NETWORK_ERROR_CODE
    error.message = NETWORK_ERROR_MSG
  } else if (
    // 超时错误
    axiosError.code === REQUEST_TIMEOUT_CODE &&
    axiosError.message.includes('timeout')
  ) {
    error.code = REQUEST_TIMEOUT_CODE
    error.message = REQUEST_TIMEOUT_MSG
  } else if (axiosError.code === REQUEST_CANCELED_CODE) {
    error.code = REQUEST_CANCELED_CODE
    error.message = REQUEST_CANCELED_MSG
  } else if (
    // 请求失败的错误
    axiosError.response
  ) {
    const errorCode = axiosError.response.status as ErrorStatus
    error.code = errorCode
    error.message = ERROR_STATUS[errorCode]
  }

  showErrorMsg(error)

  return error
}

/**
 * 处理后端返回的错误（业务错误）
 * @param code
 * @param message
 */
export function handleBackendError(code: string | number, message: string) {
  const error: RequestError = {
    type: 'backend',
    code: code,
    message
  }

  showErrorMsg(error)

  return error
}

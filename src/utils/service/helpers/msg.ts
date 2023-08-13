import type { AxiosError } from 'axios'
import { exeStrategyActions } from '../../common'
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_MSG_DURATION,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  NO_ERROR_MSG_CODE,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG
} from '../config'

const errorMsgStack = new Map<string | number, string>([]) // 错误消息栈，防止同一错误出现两次

function addErrorMsg(err: Service.RequestError) {
  errorMsgStack.set(err.code, err.msg)
}

function removeErrMsg(err: Service.RequestError) {
  errorMsgStack.delete(err.code)
}

function hasErrorMsg(error: Service.RequestError) {
  return errorMsgStack.has(error.code)
}

/**
 * 显示错误消息
 * @param error
 * @returns
 */
export function showErrorMsg(error: Service.RequestError) {
  if (!error.msg || NO_ERROR_MSG_CODE.includes(error.code) || hasErrorMsg(error)) return

  addErrorMsg(error)
  console.warn(error.code, error.msg)
  window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION })
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
  const error: Service.RequestError = {
    type: 'http',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  }

  const actions: Common.StrategyAction[] = [
    [
      // 网络错误
      !window.navigator.onLine ||
        axiosError.code === NETWORK_ERROR_CODE ||
        axiosError.message === 'Network Error',
      () => {
        error.code = NETWORK_ERROR_CODE
        error.msg = NETWORK_ERROR_MSG
      }
    ],
    [
      // 超时错误
      axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('timeout'),
      () => {
        error.code = REQUEST_TIMEOUT_CODE
        error.msg = REQUEST_TIMEOUT_MSG
      }
    ],
    [
      // 请求失败的错误
      Boolean(axiosError.response),
      () => {
        const errorCode = axiosError.response?.status as ErrorStatus
        error.code = errorCode
        error.msg = ERROR_STATUS[errorCode]
      }
    ]
  ]
  exeStrategyActions(actions)

  showErrorMsg(error)

  return error
}

/**
 * 处理后端返回的错误（业务错误）
 * @param code
 * @param message
 */
export function handleBackendError(code: string | number, message: string) {
  const error: Service.RequestError = {
    type: 'backend',
    code: code,
    msg: message
  }

  showErrorMsg(error)

  return error
}

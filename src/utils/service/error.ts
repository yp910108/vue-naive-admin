import type { AxiosError, AxiosResponse } from 'axios'
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG
} from '@/config'
import { exeStrategyActions } from '../common'
import { showErrorMsg } from './msg'

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

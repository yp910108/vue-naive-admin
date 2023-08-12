import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  handleAxiosError,
  handleBackendError,
  handleServiceResult,
  localStg,
  transformRequestData
} from '@/utils'
import { REFRESH_TOKEN_CODE } from '@/config'
import { handleRefreshToken } from './helpers'

type RefreshRequestQueue = () => void

export default class CustomAxiosInstance {
  instance: AxiosInstance

  backendConfig: Service.BackendResultConfig

  isRefreshing: boolean

  retryQueues: RefreshRequestQueue[]

  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      messageKey: 'message',
      successCode: 200
    }
  ) {
    this.instance = axios.create(axiosConfig)
    this.backendConfig = backendConfig
    this.isRefreshing = false
    this.retryQueues = []
    this.setInterceptor()
  }

  setInterceptor() {
    this.instance.interceptors.request.use((config) => {
      if (config.headers) {
        const contentType = config.headers['Content-Type'] as UnionKey.ContentType
        config.headers.Authorization = localStg.get('token') ?? ''
        config.data = transformRequestData(config.data, contentType)
      }
      return config
    })
    this.instance.interceptors.response.use(
      (async (response) => {
        const { config } = response
        const backendResult = response.data
        const { codeKey, dataKey, messageKey, successCode } = this.backendConfig
        const code = backendResult[codeKey]
        const data = backendResult[dataKey]
        const message = backendResult[messageKey]

        // 请求成功
        if (code === successCode) {
          return handleServiceResult(null, data)
        }

        // token 失效，刷新 token
        if (REFRESH_TOKEN_CODE.includes(code)) {
          const originRequest = new Promise((resolve) => {
            this.retryQueues.push(() => {
              resolve(this.instance.request(config))
            })
          })

          if (!this.isRefreshing) {
            this.isRefreshing = true
            await handleRefreshToken()
            this.retryQueues.map((cb) => cb())
            this.retryQueues = []
            this.isRefreshing = false
          }
          return originRequest
        }

        const error = handleBackendError(code, message)
        return handleServiceResult(error, null)
      }) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        if (axiosError.response) {
          const { status, data } = axiosError.response
          if (status === 304) {
            return handleServiceResult(null, data)
          }
        }
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )
  }
}

import { REQUEST_TIMEOUT } from './constants'
import { createRequest } from './request'

export const mockRequest = createRequest({ baseURL: '/mock', timeout: REQUEST_TIMEOUT })

export const request = createRequest({
  baseURL: '/',
  timeout: REQUEST_TIMEOUT
})

export * from './typings'
export * from './constants'

import { REQUEST_TIMEOUT } from './config'
import { createRequest } from './request'

export const mockRequest = createRequest({ baseURL: '/mock', timeout: REQUEST_TIMEOUT })

export * from './config'

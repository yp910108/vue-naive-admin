import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { BackendConfig } from './typings'
import CustomAxiosInstance from './instance'

type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

interface RequestParam {
  url: string
  method: RequestMethod
  data?: any
  config?: AxiosRequestConfig
}

type RequestParams = RequestParam & { instance: AxiosInstance }

async function getRequestResponse(params: RequestParams): Promise<any> {
  const { instance, method, url, data, config } = params

  if (method === 'get' || method === 'delete') {
    return await instance[method](url, config)
  } else {
    return await instance[method](url, data, config)
  }
}

export function createRequest(
  axiosConfig: AxiosRequestConfig,
  backendConfig?: Partial<BackendConfig>
) {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig)

  async function asyncRequest<T>(param: RequestParam) {
    const { instance } = customInstance
    return (await getRequestResponse({ ...param, instance })) as T | undefined
  }

  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', config })
  }

  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, config })
  }

  function patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'patch', data, config })
  }

  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, config })
  }

  function handleDelete<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', config })
  }

  return { get, post, patch, put, delete: handleDelete }
}

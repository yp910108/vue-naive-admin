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

const getRequestResponse = async (params: RequestParams): Promise<any> => {
  const { instance, method, url, data, config } = params

  if (method === 'get' || method === 'delete') {
    return await instance[method](url, config)
  } else {
    return await instance[method](url, data, config)
  }
}

export const createRequest = (
  axiosConfig: AxiosRequestConfig,
  backendConfig?: Partial<BackendConfig>
) => {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig)

  const asyncRequest = async <T>(param: RequestParam) => {
    const { instance } = customInstance
    return (await getRequestResponse({ ...param, instance })) as T | undefined
  }

  const get = <T>(url: string, config?: AxiosRequestConfig) => {
    return asyncRequest<T>({ url, method: 'get', config })
  }

  const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return asyncRequest<T>({ url, method: 'post', data, config })
  }

  const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return asyncRequest<T>({ url, method: 'patch', data, config })
  }

  const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return asyncRequest<T>({ url, method: 'put', data, config })
  }

  const handleDelete = <T>(url: string, config?: AxiosRequestConfig) => {
    return asyncRequest<T>({ url, method: 'delete', config })
  }

  return { get, post, patch, put, delete: handleDelete }
}

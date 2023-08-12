export const REQUEST_TIMEOUT = 60 * 1000 // 请求超时时间

export const ERROR_MSG_DURATION = 3 * 1000 // 错误信息的显示时间

export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT' // 默认的请求错误 code

export const DEFAULT_REQUEST_ERROR_MSG = '请求错误～' // 默认的请求错误文本

export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED' // 请求超时的错误 code

export const REQUEST_TIMEOUT_MSG = '请求超时～' // 请求超时的错误文本

export const NETWORK_ERROR_CODE = 'ERR_NETWORK' // 网络不可用的 code

export const NETWORK_ERROR_MSG = '网络不可用～' // 网络不可用的错误文本

// 请求失败各种状态的错误
export const ERROR_STATUS = {
  400: '400: 请求出现语法错误～',
  401: '401: 用户未授权～',
  403: '403: 服务器拒绝访问～',
  404: '404: 请求的资源不存在～',
  405: '405: 请求方法未允许～',
  408: '408: 网络请求超时～',
  500: '500: 服务器内部错误～',
  501: '501: 服务器未实现请求功能～',
  502: '502: 错误网关～',
  503: '503: 服务不可用～',
  504: '504: 网关超时～',
  505: '505: http 版本不支持该请求～',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG
}

export const NO_ERROR_MSG_CODE: (string | number)[] = [] // 不弹出错误信息的 code

export const REFRESH_TOKEN_CODE: (string | number)[] = [66666] // token 失效需要刷新 token 的 code（这里的 66666 只是个例子，需要将后端表示 token 过期的 code 填进来）

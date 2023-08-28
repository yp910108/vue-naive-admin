import type { MockMethod } from 'vite-plugin-mock'
import type { MockServiceResult } from '../typing'
import { userModel } from '../model'

const ERROR_PARAM_CODE = 10000

const ERROR_PARAM_MSG = '参数校验失败！'

const apis: MockMethod[] = [
  {
    url: '/mock/getSmsCode',
    method: 'post',
    response: (): MockServiceResult<boolean> => {
      return {
        code: 200,
        message: 'ok',
        data: true
      }
    }
  },
  {
    url: '/mock/login',
    method: 'post',
    // rawResponse: (_, res) => {
    //   res.setHeader('Content-Type', 'text/plain')
    //   res.statusCode = 401
    //   res.end(`hello, this is data.`)
    // },
    response: (options): MockServiceResult<string | null> => {
      const { userName = undefined, password = undefined } = options.body

      if (!userName || !password) {
        return {
          code: ERROR_PARAM_CODE,
          message: ERROR_PARAM_MSG,
          data: null
        }
      }

      const findItem = userModel.find(
        (item) => item.userName === userName && item.password === password
      )

      if (findItem) {
        return {
          code: 200,
          message: 'ok',
          data: findItem.token
        }
      }
      return {
        code: 1000,
        message: '用户名或密码错误！',
        data: null
      }
    }
  },
  {
    url: '/mock/getUserInfo',
    method: 'get',
    // rawResponse: (_, res) => {
    //   res.setHeader('Content-Type', 'text/plain')
    //   res.statusCode = 401
    //   res.end(`hello, this is data.`)
    // },
    response: (options): MockServiceResult<Auth.UserInfo | null> => {
      const { authorization = '' } = options.headers
      const INVALID_CODE = 66666

      if (!authorization) {
        return {
          code: INVALID_CODE,
          message: '用户已失效或不存在！',
          data: null
        }
      }

      const userInfo = userModel.find(({ token }) => token === authorization)

      if (userInfo) {
        return {
          code: 200,
          message: 'ok',
          data: userInfo
        }
      }

      return {
        code: INVALID_CODE,
        message: '用户信息异常！',
        data: null
      }
    }
  }
]

export default apis

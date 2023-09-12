import type { MockMethod } from 'vite-plugin-mock'
import { routeModel } from '../model/route'

const apis: MockMethod[] = [
  {
    url: '/mock/getAuthRoutes',
    method: 'get',
    // rawResponse: (_, res) => {
    //   res.setHeader('Content-Type', 'text/plain')
    //   res.statusCode = 401
    //   res.end(`hello, this is data.`)
    // },
    // response: (): Service.MockServiceResult => {
    //   const INVALID_CODE = 66666

    //   return {
    //     code: INVALID_CODE,
    //     message: '用户信息已失效～',
    //     data: null
    //   }
    // },
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: routeModel
      }
    }
  }
]

export default apis

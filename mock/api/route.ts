import type { MockMethod } from 'vite-plugin-mock'
import { userModel } from '../model'
import { routeModel } from '../model/route'

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    rawResponse: (_, res) => {
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 401
      res.end(`hello, this is data.`)
    },
    response: (options): Service.MockServiceResult => {
      const { userId } = options.body

      const role = userModel.find((item) => item.userId === userId)?.userRole ?? 'super'

      const routes = routeModel[role]

      return {
        code: 200,
        message: 'ok',
        data: routes
      }
    }
  }
]

export default apis

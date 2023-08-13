import type { MockMethod } from 'vite-plugin-mock'
import { userModel } from '../model'
import { routeModel } from '../model/route'

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
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

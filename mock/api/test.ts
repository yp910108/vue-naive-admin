import type { MockMethod } from 'vite-plugin-mock'

const apis: MockMethod[] = [
  {
    url: '/mock/getList',
    method: 'post',
    response: (): Service.MockServiceResult<{ x: string }[]> => {
      return {
        code: 200,
        message: 'ok',
        data: [{ x: '111' }, { x: '222' }]
      }
    }
  }
]

export default apis

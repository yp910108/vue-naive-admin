import type { MockMethod } from 'vite-plugin-mock'

const apis: MockMethod[] = [
  {
    url: '/mock/test',
    method: 'get',
    rawResponse: (_, res) => {
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 401
      res.end(`hello, this is data.`)
    },
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: 'this is data.'
      }
    }
  }
]

export default apis

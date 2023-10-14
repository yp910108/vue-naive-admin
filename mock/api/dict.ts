import type { MockMethod } from 'vite-plugin-mock'

const apis: MockMethod[] = [
  {
    url: '/mock/dict/:type',
    method: 'get',
    response: ({ url }) => {
      const type = url.split('?')[1].split('=')[1]
      const data: any = {
        sex: [
          { value: '1', label: '男' },
          { value: '2', label: '女' }
        ],
        politics: [
          { value: '1', label: '党员' },
          { value: '2', label: '团员' },
          { value: '3', label: '群众' }
        ]
      }
      return {
        code: 200,
        message: 'ok',
        data: data[type]
      }
    }
  }
]

export default apis

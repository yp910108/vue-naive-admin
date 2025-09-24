import type { MockMethod } from 'vite-plugin-mock'

const apis: MockMethod[] = [
  {
    url: '/mock/dict',
    method: 'get',
    response: ({ query }: any) => {
      const data: Dict.Data = {
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
        data: data[query.type as keyof Dict.Type]
      }
    }
  }
]

export default apis

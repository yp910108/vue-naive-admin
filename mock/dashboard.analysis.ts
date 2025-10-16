import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const apis: MockMethod[] = [
  {
    url: '/mock/dashboard/analysys/usage-num',
    method: 'get',
    response: () => ({
      code: 200,
      message: 'ok',
      data: {
        user: { num: 2125, increment: 3 },
        visit: { num: 25210, increment: -2 },
        download: { num: 36555, increment: 5 },
        apply: { num: 28675, increment: 5 }
      }
    })
  },
  {
    url: '/mock/dashboard/analysys/usage-trend',
    method: 'get',
    response: ({ query }: any) => {
      const { type } = query
      const monthList = Array.from({ length: 12 }, (_, index) =>
        Mock.mock({
          time: `${index + 1}月`,
          'visitNum|6000-9000': 9000,
          'applyNum|6000-9000': 9000
        })
      )
      const dayList = Array.from({ length: 15 }, (_, index) =>
        Mock.mock({
          time: `10/${`${index + 1}`.padStart(2, '0')}`,
          'visitNum|200-300': 300,
          'applyNum|200-300': 300
        })
      )
      return {
        code: 200,
        message: 'ok',
        data: type === 'month' ? monthList : dayList
      }
    }
  }
]

export default apis

import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

interface Row {
  id?: number
  name?: string
  sex?: string
  age?: number
  birthDate?: string
}

const apis: MockMethod[] = [
  {
    url: '/mock/users',
    method: 'get',
    response: ({ query }: any) => {
      const { age, startBirthDate, endBirthDate, page, pageSize, ...rest } = query
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: {
          total: 100,
          'list|100': [
            {
              'id|+1': 1,
              name: '@cname',
              'sex|1': ['1', '2'],
              'age|25-35': 0,
              birthDate: '@date'
            }
          ]
        }
      })
      let list = response.data.list as Row[]
      if (age) {
        list = list.filter((item) => item.age === +age)
      }
      if (startBirthDate && endBirthDate) {
        list = list.filter(
          (item) =>
            new Date(item.birthDate!).getTime() >= new Date(startBirthDate).getTime() &&
            new Date(item.birthDate!).getTime() <= new Date(endBirthDate).getTime()
        )
      }
      for (const prop in rest) {
        list = list.filter((item) => (item as any)[prop as any].includes(rest[prop]))
      }
      const _list = page ? list.slice((page - 1) * pageSize, page * pageSize) : list
      response.data.total = list.length
      response.data.list = _list
      return response
    }
  }
]

export default apis

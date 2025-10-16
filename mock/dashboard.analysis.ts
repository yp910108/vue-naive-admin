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
    url: '/mock/dashboard/analysys/usage-trend',
    method: 'get',
    response: ({ query }: any) => {
      const { type } = query
      const length = type === 'month' ? 12 : 15
      const monthList = Array.from({ length: 12 }, (_, index) =>
        Mock.mock({
          time: `${index + 1}月`,
          'visitNum|200-300': 300,
          'applyNum|200-300': 300
        })
      )
      const dayList = Array.from({ length: 15 }, (_, index) =>
        Mock.mock({
          time: `${index + 1}月`,
          'visitNum|200-300': 300,
          'applyNum|200-300': 300
        })
      )
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        [`data|${length}`]: [
          {
            'id|+1': 1,
            name: '@cname',
            'sex|1': ['1', '2'],
            'age|25-35': 0,
            birthDate: '@date',
            'politics|1': ['1', '2', '3'],
            addressId: '1000202',
            addressName: '北京市 / 西城区',
            deptId: '1000103',
            deptName: '开发三部',
            leaderId: '2',
            leaderName: '张三',
            'remark|1-3': '@csentence'
          }
        ]
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

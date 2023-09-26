import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const apis: MockMethod[] = [
  {
    url: '/mock/function/table',
    method: 'get',
    response: ({ query }) => {
      const { age, startBirthDate, endBirthDate, page, pageSize, ...rest } = query
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: {
          total: 155,
          'list|155': [
            {
              'id|+1': 1,
              name: '@cname',
              'sex|1': ['1', '2'],
              'age|25-35': 0,
              birthDate: '@date',
              'politics|1': ['1', '2', '3'],
              addressId: ['10002', '1000202'],
              addressName: '北京市 / 东城区',
              deptId: '1000103',
              deptName: '开发三部',
              leaderId: '2',
              leaderName: '张三',
              remark: '@cparagraph'
            }
          ]
        }
      })
      let { list } = response.data
      if (age) {
        list = list.filter((item: any) => item.age === +age)
      }
      if (startBirthDate && endBirthDate) {
        list = list.filter(
          (item: any) =>
            new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() &&
            new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
        )
      }
      for (const prop in rest) {
        list = list.filter((item: any) => item[prop].includes(rest[prop]))
      }
      list = list.slice((page - 1) * pageSize, page * pageSize)
      response.data.list = list
      return response
    }
  }
]

export default apis

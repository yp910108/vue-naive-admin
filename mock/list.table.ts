import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

interface DataItem {
  id?: number
  name?: string
  sex?: string
  age?: number
  birthDate?: string
}

const methods: MockMethod[] = [
  {
    url: '/mock/list/table',
    method: 'get',
    response: ({ query }: any) => {
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
              addressId: '1000202',
              addressName: '北京市 / 西城区',
              deptId: '1000103',
              deptName: '开发三部',
              leaderId: '2',
              leaderName: '张三',
              'remark|1-3': '@csentence'
            }
          ]
        }
      })
      let list = response.data.list as DataItem[]
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
  },
  {
    url: '/mock/list/table/:id',
    method: 'get',
    response: () => {
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: {
          id: 1,
          name: '江涛',
          sex: '1',
          age: 33,
          birthDate: '1992-12-07',
          politics: '2',
          addressId: '1000202',
          addressName: '北京市 / 西城区',
          deptId: '1000103',
          deptName: '开发三部',
          leaderId: 2,
          leaderName: '高霞',
          remark: '式等命安机文究不说真直它度命带统便。花与矿世土解白及太西来严。'
        }
      })
      return response
    }
  },
  {
    url: '/mock/list/table',
    method: 'post',
    response: () => {
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: null
      })
      return response
    }
  },
  {
    url: '/mock/list/table/:id',
    method: 'patch',
    response: () => {
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: null
      })
      return response
    }
  },
  {
    url: '/mock/list/table/:id',
    method: 'delete',
    response: () => {
      const response = Mock.mock({
        code: 200,
        message: 'ok',
        data: null
      })
      return response
    }
  }
]

export default methods

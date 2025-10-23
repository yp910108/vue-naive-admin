import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const methods: MockMethod[] = [
  {
    url: '/mock/dashboard/analysys/usage-num',
    method: 'get',
    response: () => ({
      code: 200,
      message: 'ok',
      data: {
        user: Mock.mock({
          'num|2000-3000': 0,
          'increment|-10-10': 0
        }),
        visit: Mock.mock({
          'num|20000-30000': 0,
          'increment|-10-10': 0
        }),
        download: Mock.mock({
          'num|20000-30000': 0,
          'increment|-10-10': 0
        }),
        apply: Mock.mock({
          'num|20000-30000': 0,
          'increment|-10-10': 0
        })
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
          'visitNum|6000-9000': 0,
          'downloadNum|6000-9000': 0,
          'applyNum|6000-9000': 0
        })
      )
      const dayList = Array.from({ length: 15 }, (_, index) =>
        Mock.mock({
          time: `10/${`${index + 1}`.padStart(2, '0')}`,
          'visitNum|200-300': 0,
          'downloadNum|200-300': 0,
          'applyNum|200-300': 0
        })
      )
      return {
        code: 200,
        message: 'ok',
        data: type === 'month' ? monthList : dayList
      }
    }
  },
  {
    url: '/mock/dashboard/analysys/visit-source',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: Mock.mock({
          'search|6000-9000': 0,
          'direct|6000-9000': 0,
          'email|6000-9000': 0,
          'adware|6000-9000': 0
        })
      }
    }
  },
  {
    url: '/mock/dashboard/analysys/visit-way',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: Mock.mock({
          'web|6000-9000': 0,
          'app|6000-9000': 0,
          'pad|6000-9000': 0,
          'third|6000-9000': 0,
          'other|6000-9000': 0
        })
      }
    }
  },
  {
    url: '/mock/dashboard/analysys/recent-news',
    method: 'get',
    response: () => {
      const generateAvatar = () => {
        const num = Math.ceil(Math.random() * 1000)
        return `https://yp910108.github.io/avatar/${num}.png`
      }
      return {
        code: 200,
        message: 'ok',
        data: [
          {
            name: '光头强',
            avatar: generateAvatar(),
            time: '刚刚',
            desc: '关注了 `熊大`'
          },
          {
            name: '熊二',
            avatar: generateAvatar(),
            time: '刚刚',
            desc: '发布了 `个人动态`'
          },
          {
            name: '熊大',
            avatar: generateAvatar(),
            time: '1个小时前',
            desc: '在 `开源组` 创建了项目 `Vue`'
          },
          {
            name: '麦克斯',
            avatar: generateAvatar(),
            time: '1天前',
            desc: '回复了 `露西` 的问题 `如何进行项目优化？`'
          },
          {
            name: '露西',
            avatar: generateAvatar(),
            time: '2天前',
            desc: '发表问题 `如何进行项目优化？`'
          },
          {
            name: '赛米',
            avatar: generateAvatar(),
            time: '3天前',
            desc: '关闭了问题 `如何运行项目`'
          },
          {
            name: '弗特',
            avatar: generateAvatar(),
            time: '1周前',
            desc: '发表文章 `如何编写一个 Vite 插件？`'
          },
          {
            name: '付小小',
            avatar: generateAvatar(),
            time: '3周前',
            desc: '发布了 `个人动态`'
          },
          {
            name: '林东东',
            avatar: generateAvatar(),
            time: '2025-10-16',
            desc: '推送了代码到 `Github`'
          },
          {
            name: 'admin',
            avatar: generateAvatar(),
            time: '2025-10-09',
            desc: '发表文章 `如何编写使用 Vue Naive Admin？`'
          }
        ]
      }
    }
  }
]

export default methods

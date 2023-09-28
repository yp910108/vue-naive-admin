import type { CascaderOption, TreeSelectOption } from 'naive-ui'
import { transformObjectToOption } from '@/utils'
import type { Politics, Sex } from './typings'

export const SEX: Record<Sex, string> = {
  '1': '男',
  '2': '女'
}
export const sexOptions = transformObjectToOption(SEX)

export const POLITICS: Record<Politics, string> = {
  '1': '党员',
  '2': '团员',
  '3': '群众'
}
export const politicsOptions = transformObjectToOption(POLITICS)

export const addressOptions: CascaderOption[] = [
  {
    value: '10001',
    label: '山东省',
    children: [
      {
        value: '1000101',
        label: '济南市',
        children: [
          {
            value: '100010101',
            label: '高新区'
          },
          {
            value: '100010102',
            label: '历城区'
          }
        ]
      }
    ]
  },
  {
    value: '10002',
    label: '北京市',
    children: [
      {
        value: '1000201',
        label: '东城区'
      },
      {
        value: '1000202',
        label: '西城区'
      }
    ]
  }
]

export const deptOptions: TreeSelectOption[] = [
  {
    key: '10001',
    label: '开发部',
    children: [
      {
        key: '1000101',
        label: '开发一部'
      },
      {
        key: '1000102',
        label: '开发二部'
      },
      {
        key: '1000103',
        label: '开发三部'
      },
      {
        key: '1000104',
        label: '开发四部'
      },
      {
        key: '1000105',
        label: '开发五部'
      }
    ]
  },
  {
    key: '10002',
    label: '人力资源部',
    children: [
      {
        key: '1000201',
        label: '人力资源部一部'
      },
      {
        key: '1000202',
        label: '人力资源部二部'
      },
      {
        key: '1000203',
        label: '人力资源部三部'
      }
    ]
  }
]

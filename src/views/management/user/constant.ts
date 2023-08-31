import { transformObjectToOption } from '@/utils'
import type { Gender, Status } from './typing'

/**
 * 用户性别
 */
export const genderLabels: Record<Gender, string> = {
  0: '女',
  1: '男'
}
export const genderOptions = transformObjectToOption(genderLabels)

/**
 * 用户状态
 */
export const statusLabels: Record<Status, string> = {
  1: '启用',
  2: '禁用',
  3: '冻结',
  4: '软删除'
}
export const statusOptions = transformObjectToOption(statusLabels)

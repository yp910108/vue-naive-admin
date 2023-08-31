export type Gender = '0' | '1'

export type Status = '1' | '2' | '3' | '4'

export interface User {
  /**
   * 用户id
   */
  id: string
  /**
   * 用户名
   */
  userName: string
  /**
   * 用户年龄
   */
  age: number
  /**
   * 用户性别
   * - 0: 女
   * - 1: 男
   */
  gender: Gender
  /**
   * 用户手机号码
   */
  phone: string
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 用户状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  status: Status
}

export interface Row extends User {
  /**
   * 序号
   */
  index: number
  /**
   * 表格的key（id）
   */
  key: string
}

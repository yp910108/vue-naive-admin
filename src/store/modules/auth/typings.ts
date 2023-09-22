/**
 * 用户角色类型
 * - super: 超级管理员(该权限具有所有路由数据)
 * - admin: 管理员
 * - user: 用户
 */
export type RoleType = 'super' | 'admin' | 'user'

/**
 * 用户信息
 */
export interface UserInfo {
  userId: string
  userName: string
  userRole: RoleType
}

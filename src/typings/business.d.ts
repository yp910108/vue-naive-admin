declare namespace Auth {
  /**
   * 用户角色类型（前端静态路由用角色类型进行路由权限的控制）
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = 'super' | 'admin' | 'user'

  interface UserInfo {
    userId: string
    userName: string
    userRole: RoleType
  }
}

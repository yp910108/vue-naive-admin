export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      title: '仪表盘',
      path: 'dashboard',
      icon: 'monitor-dashboard',
      children: [
        {
          title: '分析页',
          path: 'analysis',
          icon: 'analysis'
        },
        {
          title: '控制台',
          path: 'workbench',
          icon: 'workbench'
        }
      ]
    }
  ],
  admin: [],
  user: []
}

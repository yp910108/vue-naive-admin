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
    },
    {
      title: '示例',
      path: 'example',
      icon: 'monitor-dashboard',
      children: [
        {
          title: '列表',
          path: 'table',
          icon: 'analysis'
        },
        {
          title: '表单',
          path: 'form',
          icon: 'workbench'
        }
      ]
    }
  ],
  admin: [],
  user: []
}

export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    }
  ],
  admin: [],
  user: []
}

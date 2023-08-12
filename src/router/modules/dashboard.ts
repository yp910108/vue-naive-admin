const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  meta: {
    title: '仪表盘',
    icon: 'monitor-dashboard',
    order: 1,
    i18nTitle: 'routes.dashboard._value'
  },
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
    },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '工作台',
        requiresAuth: true,
        icon: 'workbench',
        i18nTitle: 'routes.dashboard.workbench'
      }
    }
  ]
}

export default dashboard

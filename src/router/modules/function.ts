const functionRoute: AuthRoute.Route = {
  name: 'function',
  path: '/function',
  component: 'basic',
  children: [
    {
      name: 'function_tab',
      path: '/function/tab',
      component: 'self',
      meta: {
        title: 'Tab',
        i18nTitle: 'routes.function.tab',
        requiresAuth: true,
        icon: 'round-tab'
      }
    },
    {
      name: 'function_tab-detail',
      path: '/function/tab-detail',
      component: 'self',
      meta: {
        title: 'Tab Detail',
        requiresAuth: true,
        hide: true,
        activeMenu: 'function_tab',
        icon: 'round-tab'
      }
    },
    {
      name: 'function_tab-multi-detail',
      path: '/function/tab-multi-detail',
      component: 'self',
      meta: {
        title: 'Tab Multi Detail',
        requiresAuth: true,
        hide: true,
        multiTab: true,
        activeMenu: 'function_tab',
        icon: 'round-tab'
      }
    }
  ],
  meta: {
    title: '功能',
    i18nTitle: 'routes.function._value',
    icon: 'all-application',
    order: 6
  }
}

export default functionRoute

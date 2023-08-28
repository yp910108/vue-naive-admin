export const routes: AuthRoute.Route[] = [
  {
    title: '登录',
    path: 'login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    layout: 'blank',
    props: (route) => ({
      module: route.params.module ?? 'pwd-login'
    }),
    white: true
  },
  {
    title: '无权限',
    path: '403',
    layout: 'blank',
    white: true
  },
  {
    title: '未找到',
    path: '404',
    layout: 'blank',
    white: true
  },
  {
    title: '服务器错误',
    path: '500',
    layout: 'blank',
    white: true
  },
  {
    title: 'Tab 详情',
    path: 'function/tab-detail',
    icon: 'round-tab',
    activeMenu: '/function/tab',
    hide: true
  }
]

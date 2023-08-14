const routes: AuthRoute.Route[] = [
  {
    title: '登录',
    path: 'login/:module?',
    layout: 'blank',
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
  }
]

export default routes

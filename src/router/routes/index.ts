const routes: AuthRoute.Route[] = [
  {
    title: '登录',
    path: 'login',
    layout: 'blank'
  },
  {
    title: '无权限',
    path: '403',
    layout: 'blank'
  },
  {
    title: '未找到',
    path: '404',
    layout: 'blank'
  },
  {
    title: '服务器错误',
    path: '500',
    layout: 'blank'
  }
]

export default routes

const modules = import.meta.glob('./**/*.ts', { eager: true }) as AuthRoute.RouteModule

const routes: AuthRoute.Route[] = []

for (const key of Object.keys(modules)) {
  const item = modules[key].default
  if (item) {
    routes.push(item)
  } else {
    console.error(`路由解析出错：key=${key}`)
  }
}

export default routes

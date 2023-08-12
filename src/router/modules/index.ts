import { handleModuleRoutes } from '@/utils'

const modules = import.meta.glob('./**/*.ts', { eager: true }) as AuthRoute.RouteModule

export const routes: AuthRoute.Route[] = handleModuleRoutes(modules)

import type { RouteComponent } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import { views } from '@/views'
import { isFunction } from '../common'

type Lazy<T> = () => Promise<T>

interface ModuleComponent {
  default: RouteComponent
}

type LayoutComponent = Record<UnionKey.LayoutComponentType, Lazy<ModuleComponent>>

function isAsyncComponent(
  component: RouteComponent | Lazy<ModuleComponent>
): component is Lazy<ModuleComponent> {
  return isFunction(component)
}

/**
 * 获取布局组件
 * @param layoutType 布局组件类型
 * @returns 布局组件
 */
export function getLayoutComponent(layoutType: UnionKey.LayoutComponentType) {
  const LayoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout
  }
  return LayoutComponent[layoutType]
}

/**
 * 给页面组件设置名称
 * @param component 页面组件
 * @param name 名称
 * @returns 设置名称后的该页面组件
 */
function setViewComponentName(component: RouteComponent | Lazy<ModuleComponent>, name: string) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component()
      Object.assign(result.default, { name })
      return result
    }
  }
  Object.assign(component, { name })
  return component
}

/**
 * 获取页面导入的 vue 文件
 * @param routeKey 路由 key
 * @returns 对应 vue 组件
 */
export function getViewComponent(routeKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[routeKey]) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`)
  }
  return setViewComponentName(views[routeKey], routeKey)
}

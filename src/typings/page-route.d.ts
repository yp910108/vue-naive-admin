declare namespace PageRoute {
  /**
   * the root route key
   * @translate 根路由
   */
  type RootRouteKey = 'root';

  /**
   * the not found route, which catch the invalid route path
   * @translate 未找到路由(捕获无效路径的路由)
   */
  type NotFoundRouteKey = 'not-found';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'login'
    | 'not-found'
    | 'dashboard'
    | 'dashboard_analysis'
    | 'dashboard_workbench'
    | 'document'
    | 'document_project-link'
    | 'exception'
    | 'exception_403'
    | 'exception_404'
    | 'exception_500'
    | 'function'
    | 'function_tab-detail'
    | 'function_tab-multi-detail'
    | 'function_tab'
    | 'multi-menu'
    | 'multi-menu_first'
    | 'multi-menu_first_second-new'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second';

  /**
   * last degree route key, which has the page file
   * @translate 最后一级路由(该级路有对应的页面文件)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | '500'
    | 'login'
    | 'not-found'
    | 'dashboard_analysis'
    | 'dashboard_workbench'
    | 'document_project-link'
    | 'exception_403'
    | 'exception_404'
    | 'exception_500'
    | 'function_tab-detail'
    | 'function_tab-multi-detail'
    | 'function_tab'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
  >;
}

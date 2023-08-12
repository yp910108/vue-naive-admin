declare namespace AuthRoute {
  type RootRouteKey = PageRoute.RootRouteKey

  type NotFoundRouteKey = PageRoute.NotFoundRouteKey

  type RouteKey = PageRoute.RouteKey

  type LastDegreeRouteKey = PageRoute.LastDegreeRouteKey

  type AllRouteKey = RouteKey | RootRouteKey | NotFoundRouteKey

  type RootRoutePath = '/'

  type NotFoundRoutePath = '/:pathMatch(.*)*'

  /**
   * 路由的组件类型
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   * - multi - 多级路由布局（三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局）
   * - self - 作为子路由，使用自身的布局（作为最后一级路由，没有子路由）
   */
  type RouteComponentType = 'basic' | 'blank' | 'multi' | 'self'

  type RoutePath<K extends AllRouteKey = AllRouteKey> = AuthRouteUtils.GetRoutePath<K>

  type RouteMeta = {
    /**
     * 路由标题（可用来作 document.title 或者菜单的名称）
     */
    title: string
    /**
     * 用来支持多国语言，如果 i18nTitle 和 title 同时存在，优先使用 i18nTitle
     */
    i18nTitle?: I18nType.I18nKey
    /**
     * 作为单级路由的父级路由布局组件
     */
    singleLayout?: Extract<RouteComponentType, 'basic' | 'blank'>
    /**
     * 是否需要登录权限
     */
    requiresAuth?: boolean
    /**
     * 表示哪种权限类型的用户可以访问此路由，空的话表示不需要权限（后端返回的动态路由不需要该属性，直接由后端根据用户角色返回对应权限数据）
     */
    permissions?: Auth.RoleType[]
    /**
     * 是否缓存页面
     */
    keepAlive?: boolean
    /**
     * 菜单和面包屑对应的图标
     */
    icon?: Icon.IconName
    /**
     * 是否在菜单中隐藏（一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中）
     */
    hide?: boolean
    /**
     * 外链链接地址
     */
    href?: string
    /**
     * 是否支持多个 tab 页签（默认一个，即相同 name 的路由会被替换）
     */
    multiTab?: boolean
    /**
     * 可用于菜单排序
     */
    order?: number
    /**
     * 当前路由需要选中的菜单项（用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况）
     */
    activeMenu?: RouteKey
    /**
     * 表示是否是多级路由的中间级路由（用于转换路由数据时筛选多级路由的标识，定义路由时不用填写）
     */
    multi?: boolean
    /**
     * 是否固定在 tab 卡不可关闭
     */
    affix?: boolean
  }

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        name: K
        path: RoutePath<K> | AuthRouteUtils.GetDynamicPath<RoutePath<K>>
        redirect?: RoutePath
        /**
         * 路由的组件类型
         * - basic - 基础布局，具有公共部分的布局
         * - blank - 空白布局
         * - multi - 多级路由布局（三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局）
         * - self - 作为子路由，使用自身的布局（作为最后一级路由，没有子路由）
         */
        component?: RouteComponentType
        children?: Route[]
        meta: RouteMeta
      } & Omit<
        import('vue-router').RouteRecordRaw,
        'name' | 'path' | 'redirect' | 'component' | 'children' | 'meta'
      >
    : never

  type RouteModule = Record<string, { default: Route }>
}

declare namespace AuthRouteUtils {
  /**
   * key => path
   */
  type KeyToPath<K extends string> = K extends `${infer Left}_${infer Right}`
    ? Left extends ''
      ? never
      : Right extends ''
      ? never
      : KeyToPath<`${Left}/${Right}`>
    : `/${K}`

  /**
   * 路由 key => path
   */
  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> =
    K extends AuthRoute.AllRouteKey
      ? K extends AuthRoute.RootRouteKey
        ? AuthRoute.RootRoutePath
        : K extends AuthRoute.NotFoundRouteKey
        ? AuthRoute.NotFoundRoutePath
        : KeyToPath<K>
      : never

  /**
   * 动态路由参数路径
   */
  type GetDynamicPath<P extends AuthRoute.RoutePath> =
    | `${P}/:${string}`
    | `${P}/:${string}(${string})`
    | `${P}/:${string}(${string})?`

  /**
   * 一级路由的 key（有子路由的一级路由和没有子路由的路由）
   */
  type GetFirstDegreeRouteKey<K extends AuthRoute.RouteKey = AuthRoute.RouteKey> =
    K extends `${infer _Left}_${infer _Right}` ? never : K

  /**
   * 有子路由的一级路由的 key
   */
  type GetFirstDegreeRouteKeyWithChildren<K extends AuthRoute.RouteKey = AuthRoute.RouteKey> =
    K extends `${infer Left}_${infer _Right}` ? Left : never

  /**
   * 单级路由的 key
   */
  type SingelRouteKey = Exclude<
    GetFirstDegreeRouteKey,
    GetFirstDegreeRouteKeyWithChildren | AuthRoute.RootRouteKey | AuthRoute.NotFoundRouteKey
  >

  /**
   * 单级路由父路由的 key
   */
  type SingleRouteParentKey = `${SingelRouteKey}-parent`

  /**
   * 单级路由父路由的 path
   */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>
}

declare namespace ApiAuth {
  interface Token {
    token: string
    refreshToken: string
  }
  type UserInfo = Auth.UserInfo
}

declare namespace ApiRoute {
  interface Route {
    routes: AuthRoute.Route[]
    home: AuthRoute.AllRouteKey
  }
}

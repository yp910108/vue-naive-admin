declare namespace StorageInterface {
  interface Session {
    themeColor: string // 主题颜色
    themeSettings: Theme.Setting // 主题配置
  }

  interface Local {
    token: string
    refreshToken: string
    userInfo: Auth.UserInfo
    multiTabRoutes: App.GlobalTabRoute[]
    lang: I18nType.Lang
  }
}

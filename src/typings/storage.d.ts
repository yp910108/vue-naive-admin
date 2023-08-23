declare namespace StorageInterface {
  interface Session {
    themeColor?: string
  }

  interface Local {
    token?: string
    userInfo?: Auth.UserInfo
    lang?: I18nType.Lang
    tabs?: App.GlobalTab[]
  }
}

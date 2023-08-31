import type { LoginModule } from './typing'

export const loginModuleLabels: Record<LoginModule, string> = {
  'pwd-login': window.$translate('login.pwdLogin.title'),
  'code-login': window.$translate('login.codeLogin.title'),
  register: window.$translate('login.register.title'),
  'reset-pwd': window.$translate('login.resetPwd.title'),
  'bind-wechat': window.$translate('login.bindWeChat.title')
}

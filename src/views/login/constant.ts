import type { LoginModule } from './typing'

export const loginModuleLabels: Record<LoginModule, string> = {
  'pwd-login': $translate('login.pwdLogin.title'),
  'code-login': $translate('login.codeLogin.title'),
  register: $translate('login.register.title'),
  'reset-pwd': $translate('login.resetPwd.title'),
  'bind-wechat': $translate('login.bindWeChat.title')
}

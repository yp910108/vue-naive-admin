import { $translate } from '@/locales'
import type { LoginModule } from './typing'

export const loginModuleLabels: Record<LoginModule, string> = {
  'pwd-login': $translate('page.login.pwdLogin.title'),
  'code-login': $translate('page.login.codeLogin.title'),
  register: $translate('page.login.register.title'),
  'reset-pwd': $translate('page.login.resetPwd.title'),
  'bind-wechat': $translate('page.login.bindWeChat.title')
}

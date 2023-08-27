import { $translate } from '@/locales'
import { transformObjectToOption } from '@/utils'

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: $translate('page.login.pwdLogin.superAdmin'),
  admin: $translate('page.login.pwdLogin.admin'),
  user: $translate('page.login.pwdLogin.user')
}
export const userRoleOptions = transformObjectToOption(userRoleLabels)

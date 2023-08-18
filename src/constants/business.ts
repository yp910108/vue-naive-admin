import { $t } from '@/locales'
import { transformObjectToOption } from '@/utils'

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: $t('page.login.pwdLogin.superAdmin'),
  admin: $t('page.login.pwdLogin.admin'),
  user: $t('page.login.pwdLogin.user')
}
export const userRoleOptions = transformObjectToOption(userRoleLabels)

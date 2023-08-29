import { $translate } from '@/locales'
import { transformObjectToOption } from '@/utils'
import type { RoleType } from '@/store'

export const userRoleLabels: Record<RoleType, string> = {
  super: $translate('page.login.pwdLogin.superAdmin'),
  admin: $translate('page.login.pwdLogin.admin'),
  user: $translate('page.login.pwdLogin.user')
}
export const userRoleOptions = transformObjectToOption(userRoleLabels)

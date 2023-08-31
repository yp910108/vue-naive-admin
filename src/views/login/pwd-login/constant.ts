import { transformObjectToOption } from '@/utils'
import type { RoleType } from '@/store'

export const userRoleLabels: Record<RoleType, string> = {
  super: $translate('login.pwdLogin.superAdmin'),
  admin: $translate('login.pwdLogin.admin'),
  user: $translate('login.pwdLogin.user')
}
export const userRoleOptions = transformObjectToOption(userRoleLabels)

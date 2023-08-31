import { transformObjectToOption } from '@/utils'
import type { RoleType } from '@/store'

export const userRoleLabels: Record<RoleType, string> = {
  super: window.$translate('login.pwdLogin.superAdmin'),
  admin: window.$translate('login.pwdLogin.admin'),
  user: window.$translate('login.pwdLogin.user')
}
export const userRoleOptions = transformObjectToOption(userRoleLabels)

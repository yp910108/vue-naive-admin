import type { UserInfo } from '@/store'

interface UserModel extends UserInfo {
  token: string
  password: string
}

export const userModel: UserModel[] = [
  {
    token: '__TOKEN_ADMIN__',
    userId: '2',
    userName: 'Admin',
    userRole: 'admin',
    password: 'abc123'
  }
]

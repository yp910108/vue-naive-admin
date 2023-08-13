interface UserModel extends Auth.UserInfo {
  password: string
}

export const userModel: UserModel[] = [
  {
    token: '__TOKEN_SOYBEAN__',
    userId: '0',
    userName: 'Soybean',
    userRole: 'super',
    password: 'soybean123'
  },
  {
    token: '__TOKEN_SUPER__',
    userId: '1',
    userName: 'Super',
    userRole: 'super',
    password: 'super123'
  },
  {
    token: '__TOKEN_ADMIN__',
    userId: '2',
    userName: 'Admin',
    userRole: 'admin',
    password: 'admin123'
  },
  {
    token: '__TOKEN_USER01__',
    userId: '3',
    userName: 'User01',
    userRole: 'user',
    password: 'user01123'
  }
]

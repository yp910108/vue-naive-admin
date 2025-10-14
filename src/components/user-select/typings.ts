export interface FetchListParams {
  name?: string
  sex?: Dict.Type['sex']
  age?: number
  startBirthDate?: string
  endBirthDate?: string
  politics?: Dict.Type['politics']
  addressId?: string
  deptId?: string
  page?: number
  pageSize?: number
}

export interface Row {
  id?: number
  name?: string
  sex?: Dict.Type['sex']
  age?: number
  birthDate?: string
  politics?: Dict.Type['politics']
  addressId?: string
  addressName?: string
  deptId?: string
  deptName?: string
  leaderId?: number
  leaderName?: string
  remark?: string
}

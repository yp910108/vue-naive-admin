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

export type Model = {
  id?: number
  name: string | null
  sex: Dict.Type['sex'] | null
  age: number | null
  birthDate: string | null
  politics: Dict.Type['politics'] | null
  addressId: string | null
  deptId: string | null
  leader: {
    id?: number
    name?: string
  } | null
  remark: string | null
}

export type BackendModel = Omit<Model, 'leader'> & {
  leaderId?: number
  leaderName?: string
}

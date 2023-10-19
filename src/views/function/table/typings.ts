export interface FetchListParams {
  name?: string
  sex?: Dict.Type['sex']
  age?: number
  startBirthDate?: string
  endBirthDate?: string
  politics?: Dict.Type['politics']
  addressId?: string
  deptId?: string
  page: number
  pageSize: number
}

export interface Row {
  id?: number | null
  name?: string | null
  sex?: Dict.Type['sex'] | null
  age?: number | null
  birthDate?: string | null
  politics?: Dict.Type['politics'] | null
  addressId?: string | null
  addressName?: string | null
  deptId?: string | null
  deptName?: string | null
  leaderId?: number | null
  leaderName?: string | null
  remark?: string | null
}

export type Model = Pick<
  Row,
  'id' | 'name' | 'sex' | 'age' | 'birthDate' | 'politics' | 'addressId' | 'deptId' | 'remark'
> & {
  leader?: {
    id: number
    name: string
  } | null
}

export type BackendModel = Omit<Model, 'leader'> & {
  leaderId?: number | null
  leaderName?: string | null
}

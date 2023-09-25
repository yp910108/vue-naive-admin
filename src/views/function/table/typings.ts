export type Sex = '1' | '2'

export type Politics = '1' | '2' | '3'

export interface FetchListParams {
  name?: string
  sex?: Sex
  age?: number
  startBirthDate?: string
  endBirthDate?: string
  politics?: Politics
  addressId?: string
  deptId?: string
  page: number
  pageSize: number
}

export type RowData = {
  id: string
  label: string
  sex: Sex
  age: number
  birthDate: string
  politics: Politics
  address: string
  dept: string
  leader: string
  remark: string
}

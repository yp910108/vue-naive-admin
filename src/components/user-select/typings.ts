export interface FetchListParams {
  name?: string
  sex?: Dict.Type['sex']
  age?: number
  startBirthDate?: string
  endBirthDate?: string
  page?: number
  pageSize?: number
}

export interface Row {
  id?: number
  name?: string
  sex?: Dict.Type['sex']
  age?: number
  birthDate?: string
}

export interface FetchListParams {
  username?: string
  realName?: string
  current?: number
  size?: number
}

export interface Row {
  id?: number
  username?: string
  realName?: string
  orgId?: string
  orgNames?: string
  orgName?: string
}

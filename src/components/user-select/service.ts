import { iamRequest } from '@/utils'
import type { FetchListParams, Row } from './typings'

export function fetchList(params: FetchListParams) {
  return iamRequest.get<{
    total?: number
    records?: Row[]
  }>('/user/user/pageWithOrgsNotEncryption', {
    params
  })
}

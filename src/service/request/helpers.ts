import { useAuthStore } from '@/store'
import { localStg } from '@/utils'
import { fetchUpdateToken } from '../api'

export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const refreshToken = localStg.get('refreshToken') ?? ''
  const { data } = await fetchUpdateToken(refreshToken)
  if (data) {
    localStg.set('token', data.token)
    localStg.set('refreshToken', data.refreshToken)
  } else {
    authStore.reset()
  }
}

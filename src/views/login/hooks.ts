import { useRoute, useRouter } from 'vue-router'
import type { LoginModule } from './typing'

export const useToLoginModule = () => {
  const route = useRoute()
  const router = useRouter()
  const toLoginModule = (module: LoginModule) => {
    const { query } = route
    router.push({ name: 'Login', params: { module }, query })
  }
  return { toLoginModule }
}

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { login as fetchLogin, fetchUserInfo } from '@/service'
import { localStg } from '@/utils'
import { $t } from '@/locales'
import { useRouteStore } from '../route'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()

  const token = ref(localStg.get('token'))
  const userInfo = ref(localStg.get('userInfo'))
  const loginLoading = ref(false)

  const reset = () => {
    token.value = localStg.get('token')
    userInfo.value = localStg.get('userInfo')
  }

  const getUserInfo = async () => {
    const _userInfo = await fetchUserInfo()
    localStg.set('userInfo', _userInfo)
    userInfo.value = _userInfo
    await routeStore.initAuthRoutes()
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    try {
      const _token = await fetchLogin(userName, password)
      localStg.set('token', _token)
      token.value = _token
      await getUserInfo()
      loginLoading.value = false
      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack', { userName: userInfo.value?.userName }),
        duration: 3000
      })
      router.push(route.query.redirect ? (route.query.redirect as string) : { name: 'Root' })
    } catch (e) {
      console.warn(e)
      loginLoading.value = false
      localStg.remove('token')
      localStg.remove('userInfo')
      reset()
    }
  }

  return {
    userInfo,
    loginLoading,
    reset,
    login,
    getUserInfo
  }
})

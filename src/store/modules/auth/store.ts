import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import { localStg } from '@/utils'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { login as postLogin, fetchUserInfo } from './service'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  const token = ref(localStg.get('token'))
  const userInfo = ref(localStg.get('userInfo'))
  const loginLoading = ref(false)

  const reset = (timeout = 0) => {
    localStg.remove('token')
    localStg.remove('userInfo')
    setTimeout(() => {
      token.value = localStg.get('token')
      userInfo.value = localStg.get('userInfo')
    }, timeout)
  }

  const getUserInfo = async () => {
    const _userInfo = await fetchUserInfo()
    localStg.set('userInfo', _userInfo)
    userInfo.value = _userInfo
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    try {
      const _token = await postLogin(userName, password)
      localStg.set('token', _token)
      token.value = _token
      await getUserInfo()
      await routeStore.initRoutes()
      loginLoading.value = false
      window.$notification.success({
        title: $translate('login.loginSuccess'),
        content: $translate('login.welcomeBack', {
          userName: userInfo.value?.userName
        }),
        duration: 3000
      })
      router.push(route.query.redirect ? (route.query.redirect as string) : { name: 'Root' })
    } catch (e) {
      console.warn(e)
      loginLoading.value = false
      reset()
    }
  }

  const logout = () => {
    const redirect = route.fullPath
    // 设置 500 毫秒延迟，避免页面出现空白
    reset(500)
    setTimeout(() => {
      routeStore.reset()
      tabStore.reset()
    }, 500)
    router.push({ name: 'Login', query: { redirect } })
  }

  return {
    userInfo,
    loginLoading,
    reset,
    login,
    logout
  }
})

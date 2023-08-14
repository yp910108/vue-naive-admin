import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { useRouterPush } from '@/composables'
import { fetchLogin, fetchUserInfo } from '@/service'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { clearAuthStorage, getToken, getUserInfo } from './helpers'
import { localStg } from '@/utils'
import { $t } from '@/locales'

export const useAuthStore = defineStore('auth-store', () => {
  const routeStore = useRouteStore()

  const { toLogin, toLoginRedirect } = useRouterPush()

  const token = ref(getToken())
  const userInfo = ref<Auth.UserInfo>(getUserInfo())
  const loginLoading = ref(false)

  const reset = () => {
    const { resetTabStore } = useTabStore()
    const route = router.currentRoute

    clearAuthStorage()

    token.value = getToken()
    userInfo.value = getUserInfo()
    loginLoading.value = false

    if (route.value.meta.requiresAuth) {
      toLogin()
    }

    nextTick(() => {
      resetTabStore()
      routeStore.reset()
    })
  }

  /**
   * 根据 token 进行登录
   * @param backendToken
   * @returns
   */
  const loginByToken = async (_token: string) => {
    let successFlag = false

    localStg.set('token', _token)

    const { data } = await fetchUserInfo()
    if (data) {
      localStg.set('userInfo', data)

      successFlag = true
      token.value = _token
      userInfo.value = data
    }

    return successFlag
  }

  const handleActionAfterLogin = async (token: string) => {
    const loginSuccess = await loginByToken(token)

    if (loginSuccess) {
      await routeStore.initAuthRoute()

      toLoginRedirect()

      if (routeStore.isInitAuthRoute) {
        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.value.userName }),
          duration: 3000
        })
      }
      return
    }
    reset()
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    const { data } = await fetchLogin(userName, password)
    if (data) {
      await handleActionAfterLogin(data)
    }
    loginLoading.value = false
  }

  return { userInfo, loginLoading, reset, login }
})

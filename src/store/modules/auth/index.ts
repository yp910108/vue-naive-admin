import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { router } from '@/router'
import { useRouterPush } from '@/composables'
import { login as fetchLogin, fetchUserInfo } from '@/service'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { localStg } from '@/utils'
import { $t } from '@/locales'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()
  const { query } = useRoute()

  const routeStore = useRouteStore()

  const token = ref(localStg.get('token'))
  const userInfo = ref(localStg.get('userInfo'))
  const loginLoading = ref(false)

  const reset = () => {
    const { resetTabStore } = useTabStore()
    const route = router.currentRoute

    localStg.remove('token')
    localStg.remove('userInfo')

    token.value = undefined
    userInfo.value = undefined

    // if (route.value.meta.requiresAuth) {
    //   toLogin()
    // }

    // nextTick(() => {
    //   resetTabStore()
    //   routeStore.reset()
    // })
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    try {
      const _token = await fetchLogin(userName, password)
      localStg.set('token', _token)
      token.value = _token

      const _userInfo = await fetchUserInfo()
      localStg.set('userInfo', _userInfo)
      userInfo.value = _userInfo

      loginLoading.value = false

      await routeStore.initAuthRoute()

      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack', { userName: userInfo.value?.userName }),
        duration: 3000
      })

      router.push(query.redirect ? (query.redirect as string) : { name: 'Root' })
    } catch (e) {
      loginLoading.value = false
      reset()
    }
  }

  return { userInfo, loginLoading, reset, login }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { $translate } from '@/locales'
import { localStg } from '@/utils'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { login as postLogin, fetchUserInfo } from './service'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()

  const route = useRoute()

  const routeStore = useRouteStore()

  const tabStore = useTabStore()

  const isInit = ref(false)

  const userInfo = ref()

  const setUserInfo = async () => {
    const res = await fetchUserInfo()
    userInfo.value = res
  }

  const init = async () => {
    await setUserInfo()
    await routeStore.init()
    isInit.value = true
  }

  const reset = (timeout = 0) => {
    isInit.value = false
    localStg.remove('token')
    setTimeout(() => {
      userInfo.value = undefined
      routeStore.reset()
      tabStore.reset()
    }, timeout)
  }

  const login = async (userName: string, password: string) => {
    try {
      const _token = await postLogin(userName, password)
      localStg.set('token', _token)
      await init()
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
      reset()
    }
  }

  const logout = () => {
    const redirect = route.fullPath
    // 设置 500 毫秒延迟，避免页面出现空白
    reset(500)
    router.push({ name: 'Login', query: { redirect } })
  }

  return { isInit, userInfo, init, reset, login, logout }
})

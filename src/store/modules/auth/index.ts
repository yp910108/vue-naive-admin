import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { localStg } from '@/utils'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { login as postLogin, fetchUserInfo } from './service'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()

  const routeStore = useRouteStore()

  const tabStore = useTabStore()

  const isInit = ref(false)

  const userInfo = ref<Auth.UserInfo>()

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
        title: '登录成功',
        content: `欢迎回来，${userInfo.value?.userName}！`,
        duration: 3000
      })
      router.push({ name: 'Root' })
    } catch (e) {
      console.warn(e)
      reset()
    }
  }

  const logout = () => {
    // 设置 500 毫秒延迟，避免页面出现空白
    reset(500)
    router.push({ name: 'Login' })
  }

  return { isInit, userInfo, init, reset, login, logout }
})

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
  const userInfo = ref<Auth.UserInfo>()
  const loginLoading = ref(false)

  const reset = () => {
    localStg.remove('token')

    token.value = undefined
    userInfo.value = undefined
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    try {
      const _token = await fetchLogin(userName, password)
      localStg.set('token', _token)
      token.value = _token

      // 下面三行可以视情况去掉，因为 router/guard/permission.ts 中做了处理
      // 此处这样做的好处：
      // - 登录成功后可以更快的进入首页
      // - 登录成功欢迎提示可以拿到用户信息
      const _userInfo = await fetchUserInfo()
      userInfo.value = _userInfo
      await routeStore.initAuthRoutes()

      loginLoading.value = false
      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack', { userName: userInfo.value?.userName }),
        duration: 3000
      })
      router.push(route.query.redirect ? (route.query.redirect as string) : { name: 'Root' })
    } catch (e) {
      loginLoading.value = false
      reset()
    }
  }

  const getUserInfo = async () => {
    const _userInfo = await fetchUserInfo()
    userInfo.value = _userInfo
  }

  return {
    userInfo,
    loginLoading,
    reset,
    login,
    getUserInfo
  }
})

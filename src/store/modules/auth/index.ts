import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { login as fetchLogin, fetchUserInfo } from '@/service'
import { localStg } from '@/utils'
import { $t } from '@/locales'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()
  const { query } = useRoute()

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
      loginLoading.value = false
      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack', { userName: userInfo.value?.userName }),
        duration: 3000
      })
      console.log(query.redirect)
      router.push(query.redirect ? (query.redirect as string) : { name: 'Root' })
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

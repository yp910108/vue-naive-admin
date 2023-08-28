import { computed, onScopeDispose, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { REGEXP_PHONE } from '@/constants'
import type { LoginModule } from './typing'
import { fetchSmsCode } from './service'

export const useToLoginModule = () => {
  const route = useRoute()
  const router = useRouter()
  const toLoginModule = (module: LoginModule) => {
    const { query } = route
    router.push({ name: 'Login', params: { module }, query })
  }
  return { toLoginModule }
}

function useCountDown(second: number) {
  if (second <= 0 || second % 1 !== 0) {
    throw new Error('倒计时的时间应该为一个正整数！')
  }
  const isComplete = ref(false)

  const counts = ref(0)
  const isCounting = computed(() => Boolean(counts.value))

  let intervalId: any

  const start = (updateSecond: number = second) => {
    if (isCounting.value) {
      isComplete.value = false
      counts.value = updateSecond
      intervalId = setInterval(() => {
        counts.value -= 1
        if (counts.value <= 0) {
          clearInterval(intervalId)
          isComplete.value = true
        }
      }, 1000)
    }
  }

  const stop = () => {
    intervalId = clearInterval(intervalId)
    counts.value = 0
  }

  onScopeDispose(stop)

  return { counts, start, stop, isCounting, isComplete }
}

export function useSmsCode() {
  const loading = ref(false)
  const { counts, start, isCounting } = useCountDown(60)

  const initLabel = '获取验证码'
  const countingLabel = (second: number) => `${second} 秒后重新获取`
  const label = computed(() => {
    let text = initLabel
    if (loading.value) {
      text = ''
    }
    if (isCounting.value) {
      text = countingLabel(counts.value)
    }
    return text
  })

  const isPhoneValid = (phone: string) => {
    let valid = true
    if (phone.trim() === '') {
      valid = false
      window.$message?.error('手机号不能为空！')
    } else if (!REGEXP_PHONE.test(phone)) {
      valid = false
      window.$message?.error('手机号码格式错误！')
    }
    return valid
  }

  const getSmsCode = async (phone: string) => {
    const valid = isPhoneValid(phone)
    if (!valid || loading.value) return
    loading.value = true
    await fetchSmsCode(phone)
    window.$message?.success('验证码发送成功！')
    start()
    loading.value = false
  }

  return { loading, label, start, isCounting, getSmsCode }
}

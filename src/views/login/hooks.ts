import { computed, onScopeDispose, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { REGEXP_PHONE } from '@/constants'
import type { LoginModule } from './typings'
import { fetchSmsCode } from './service'

export function useToLoginModule() {
  const route = useRoute()
  const router = useRouter()
  const toLoginModule = (module: LoginModule) => {
    const { query } = route
    router.push({ name: 'Login', params: { module }, query })
  }
  return { toLoginModule }
}

function useCountDown(second: number) {
  const isComplete = ref(false)

  const counts = ref(0)
  const isCounting = computed(() => Boolean(counts.value))

  let intervalId: any

  const start = (updateSecond: number = second) => {
    if (!counts.value) {
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

  const label = computed(() => {
    let text = $translate('login.smsCode.initLabel')
    if (loading.value) {
      text = ''
    }
    if (isCounting.value) {
      text = `${counts.value} ${$translate('login.smsCode.countingLabel')}`
    }
    return text
  })

  const isPhoneValid = (phone: string) => {
    let valid = true
    if (phone.trim() === '') {
      valid = false
      window.$message.error($translate('login.smsCode.phoneNotEmpty'))
    } else if (!REGEXP_PHONE.test(phone)) {
      valid = false
      window.$message.error($translate('login.smsCode.phoneInvalid'))
    }
    return valid
  }

  const getSmsCode = async (phone: string) => {
    const valid = isPhoneValid(phone)
    if (!valid || loading.value) return
    loading.value = true
    await fetchSmsCode(phone)
    window.$message.success($translate('login.smsCode.phoneSuccess'))
    start()
    loading.value = false
  }

  return { loading, label, isCounting, getSmsCode }
}

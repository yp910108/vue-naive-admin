import { computed } from 'vue'
import { REGEXP_PHONE } from '../../utils'
import { fetchSmsCode } from '@/service'
import { useLoading } from '../common'
import useCountDown from './use-count-down'

export default function useSmsCode() {
  const { loading, startLoading, endLoading } = useLoading()
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
    startLoading()
    const { data } = await fetchSmsCode(phone)
    if (data) {
      window.$message?.success('验证码发送成功！')
      start()
    }
    endLoading()
  }

  return { loading, label, start, isCounting, getSmsCode }
}

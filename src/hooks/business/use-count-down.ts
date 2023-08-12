import { computed, onScopeDispose, ref } from 'vue'
import { useBoolean } from '../common'

export default function useCountDown(second: number) {
  if (second <= 0 || second % 1 !== 0) {
    throw new Error('倒计时的时间应该为一个正整数！')
  }
  const { bool: isComplete, setTrue, setFalse } = useBoolean(false)

  const counts = ref(0)
  const isCounting = computed(() => Boolean(counts.value))

  let intervalId: any

  const start = (updateSecond: number = second) => {
    if (isCounting.value) {
      setFalse()
      counts.value = updateSecond
      intervalId = setInterval(() => {
        counts.value -= 1
        if (counts.value <= 0) {
          clearInterval(intervalId)
          setTrue()
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

import { ref } from 'vue'

/**
 * boolean 组合式函数
 * @param initValue
 * @returns
 */
export default function useBoolean(initValue = false) {
  const bool = ref(initValue)

  const setBool = (value: boolean) => {
    bool.value = value
  }

  const setTrue = () => {
    setBool(true)
  }

  const setFalse = () => {
    setBool(false)
  }

  const toggle = () => {
    setBool(!bool.value)
  }

  return { bool, setBool, setTrue, setFalse, toggle }
}

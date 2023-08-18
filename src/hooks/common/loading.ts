import useBoolean from './boolean'

/**
 * loading 组合式函数
 * @param initValue
 * @returns
 */
export default function useLoading(initValue = false) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(initValue)

  return {
    loading,
    startLoading,
    endLoading
  }
}

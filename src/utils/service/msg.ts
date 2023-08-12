import { ERROR_MSG_DURATION, NO_ERROR_MSG_CODE } from '@/config'

const errorMsgStack = new Map<string | number, string>([]) // 错误消息栈，防止同一错误出现两次

function addErrorMsg(err: Service.RequestError) {
  errorMsgStack.set(err.code, err.msg)
}

function removeErrMsg(err: Service.RequestError) {
  errorMsgStack.delete(err.code)
}

function hasErrorMsg(error: Service.RequestError) {
  return errorMsgStack.has(error.code)
}

/**
 * 显示错误消息
 * @param error
 * @returns
 */
export function showErrorMsg(error: Service.RequestError) {
  if (!error.msg || NO_ERROR_MSG_CODE.includes(error.code) || hasErrorMsg(error)) return

  addErrorMsg(error)
  console.warn(error.code, error.msg)
  window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION })
  setTimeout(() => {
    removeErrMsg(error)
  }, ERROR_MSG_DURATION)
}

import { stringify } from 'qs'
import { isFile } from '../../typeof'
import type { ContentType } from '../typings'

async function transformFile(formData: FormData, key: string, file: File[] | File) {
  if (Array.isArray(file)) {
    const promises = file.map((item) => {
      formData.append(key, item)
      return true
    })
    await Promise.all(promises)
  } else {
    formData.append(key, file)
  }
}

function handleFormData(data: Record<string, any>) {
  const formData = new FormData()
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    const isFileType = isFile(value) || (Array.isArray(value) && value.length && isFile(value[0]))

    if (isFileType) {
      transformFile(formData, key, value)
    } else {
      formData.append(key, value)
    }
  }

  return formData
}

/**
 * 请求数据转换
 * @param requestData
 * @param contentType
 * @returns
 */
export function transformRequestData(requestData: any, contentType?: ContentType) {
  if (contentType === 'application/x-www-form-urlencoded') {
    requestData = stringify(requestData)
  } else if (contentType === 'multipart/form-data') {
    requestData = handleFormData(requestData)
  }
  return requestData
}

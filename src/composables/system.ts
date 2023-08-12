import UAParser from 'ua-parser-js'

export function useDeviceInfo() {
  const parser = new UAParser()
  const result = parser.getResult()
  return result
}

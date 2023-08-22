import UAParser from 'ua-parser-js'

export function useDeviceInfo() {
  const parser = new UAParser()
  return parser.getResult()
}

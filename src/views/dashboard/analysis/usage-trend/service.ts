import type { DataItem } from './typings'

export function fetchData() {
  return Promise.resolve([
    { time: '08:00', visitNum: 267, applyNum: 298 },
    { time: '08:30', visitNum: 255, applyNum: 256 },
    { time: '09:00', visitNum: 273, applyNum: 273 },
    { time: '09:30', visitNum: 231, applyNum: 255 },
    { time: '10:00', visitNum: 256, applyNum: 221 },
    { time: '10:30', visitNum: 298, applyNum: 269 },
    { time: '11:00', visitNum: 221, applyNum: 267 },
    { time: '11:30', visitNum: 235, applyNum: 298 },
    { time: '12:00', visitNum: 269, applyNum: 235 }
  ] as DataItem[])
}

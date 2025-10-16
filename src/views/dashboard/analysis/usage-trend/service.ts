import type { DataItem, Type } from './typings'

export function fetchData(type: Type) {
  const monthData: DataItem[] = [
    { time: '1月', visitNum: 267, applyNum: 298 },
    { time: '2月', visitNum: 255, applyNum: 256 },
    { time: '3月', visitNum: 273, applyNum: 273 },
    { time: '4月', visitNum: 231, applyNum: 255 },
    { time: '5月', visitNum: 256, applyNum: 221 },
    { time: '6月', visitNum: 298, applyNum: 269 },
    { time: '7月', visitNum: 221, applyNum: 267 },
    { time: '8月', visitNum: 235, applyNum: 298 },
    { time: '9月', visitNum: 269, applyNum: 235 },
    { time: '10月', visitNum: 269, applyNum: 235 },
    { time: '11月', visitNum: 269, applyNum: 235 },
    { time: '12月', visitNum: 269, applyNum: 235 }
  ]

  const dayData: DataItem[] = [
    { time: '08:00', visitNum: 267, applyNum: 298 },
    { time: '08:30', visitNum: 255, applyNum: 256 },
    { time: '09:00', visitNum: 273, applyNum: 273 },
    { time: '09:30', visitNum: 231, applyNum: 255 },
    { time: '10:00', visitNum: 256, applyNum: 221 },
    { time: '10:30', visitNum: 298, applyNum: 269 },
    { time: '11:00', visitNum: 221, applyNum: 267 },
    { time: '11:30', visitNum: 235, applyNum: 298 },
    { time: '12:00', visitNum: 221, applyNum: 267 },
    { time: '12:30', visitNum: 235, applyNum: 298 },
    { time: '13:00', visitNum: 221, applyNum: 267 },
    { time: '13:30', visitNum: 235, applyNum: 298 },
    { time: '14:00', visitNum: 221, applyNum: 267 },
    { time: '14:30', visitNum: 235, applyNum: 298 },
    { time: '15:00', visitNum: 221, applyNum: 267 },
    { time: '15:30', visitNum: 235, applyNum: 298 },
    { time: '16:00', visitNum: 221, applyNum: 267 },
    { time: '16:30', visitNum: 235, applyNum: 298 },
    { time: '17:00', visitNum: 221, applyNum: 267 },
    { time: '17:30', visitNum: 235, applyNum: 298 },
    { time: '18:00', visitNum: 221, applyNum: 267 },
    { time: '18:30', visitNum: 235, applyNum: 298 },
    { time: '19:00', visitNum: 221, applyNum: 267 },
    { time: '19:30', visitNum: 235, applyNum: 298 },
    { time: '20:00', visitNum: 221, applyNum: 267 },
    { time: '20:30', visitNum: 235, applyNum: 298 },
    { time: '21:00', visitNum: 221, applyNum: 267 },
    { time: '21:30', visitNum: 235, applyNum: 298 },
    { time: '22:00', visitNum: 221, applyNum: 267 },
    { time: '22:30', visitNum: 235, applyNum: 298 },
    { time: '23:00', visitNum: 221, applyNum: 267 },
    { time: '23:30', visitNum: 235, applyNum: 298 },
    { time: '00:00', visitNum: 221, applyNum: 267 }
  ]

  return new Promise<DataItem[]>((resolve) => {
    setTimeout(() => {
      resolve(type === 'month' ? monthData : dayData)
    }, 1000)
  })
}

import type { DatePickerType } from '../typings'

type Size = 's' | 'm' | 'l'

export const SIZE: Record<Size, number> = {
  s: 650,
  m: 950,
  l: 1350
}

export const COLS = `1 ${SIZE.s}:2 ${SIZE.m}:3 ${SIZE.l}:4`

export const DATE_PICKER_TYPES: DatePickerType[] = [
  'date',
  'datetime',
  'daterange',
  'datetimerange',
  'month',
  'year',
  'quarter',
  'monthrange',
  'quarterrange',
  'yearrange'
]

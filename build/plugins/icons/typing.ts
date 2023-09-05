export interface Options {
  source?: string
  dts?: string
  prefix?: string
  parseColor?: boolean
}

export interface Icon {
  body: string
  left?: number
  top?: number
  width?: number
  height?: number
}

export interface Exported {
  prefix: string
  icons: {
    [prop: string]: Icon
  }
  width?: number
  height?: number
}

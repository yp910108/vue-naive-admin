export type Prefix = 'icon'

export interface Icon {
  body: string
  width?: number
  height?: number
}

export interface Exported {
  prefix: Prefix
  icons: {
    [prop: string]: Icon
  }
  width?: number
  height?: number
}

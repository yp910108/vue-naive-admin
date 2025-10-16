import type { Component } from 'vue'

type Type = 'user' | 'visit' | 'download' | 'apply'

export interface BackendDataItem {
  num: number
  increment: number
}

export type BackendData = Record<Type, BackendDataItem>

export interface DataItem {
  title: string
  num: number
  increment: number
  color: string
  icon: Component
}

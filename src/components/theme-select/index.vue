<template>
  <n-popselect
    trigger="click"
    :value="settingsStore.settings.theme"
    :options="options"
    :render-label="renderLabel"
  >
    <icon-wrap>
      <icon-follow-system />
    </icon-wrap>
  </n-popselect>
</template>

<script setup lang="tsx">
import type { Component, DefineComponent, VNodeChild } from 'vue'
import { NFlex, type SelectOption } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { IconWrap } from '@/components'
import { IconFollowSystem, IconSunny, IconMoon } from './icons'

const settingsStore = useSettingsStore()

const options: { value: Settings.Theme; label: string; icon: Component }[] = [
  { value: 'os', label: '跟随系统', icon: IconFollowSystem },
  { value: 'light', label: '亮色主题', icon: IconSunny },
  { value: 'dark', label: '暗色主题', icon: IconMoon }
]

const renderLabel = (option: SelectOption & { icon: DefineComponent }): VNodeChild => {
  return (
    <NFlex align="center" size={8}>
      <option.icon /> {option.label}
    </NFlex>
  )
}
</script>

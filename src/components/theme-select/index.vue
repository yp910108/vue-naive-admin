<template>
  <n-popselect
    trigger="click"
    :value="settingsStore.settings.theme"
    :options="options"
    :render-label="renderLabel"
    @update:value="handleUpdateTheme"
  >
    <icon-wrap>
      <icon />
    </icon-wrap>
  </n-popselect>
</template>

<script setup lang="tsx">
import { computed, type Component, type DefineComponent, type VNodeChild } from 'vue'
import { NFlex, type SelectOption } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { IconWrap } from '@/components'
import { IconFollowSystem, IconDark, IconLight } from './icons'

const settingsStore = useSettingsStore()

const options: { value: Settings.Theme; label: string; icon: Component }[] = [
  { value: 'os', label: '跟随系统', icon: IconFollowSystem },
  { value: 'light', label: '亮色主题', icon: IconDark },
  { value: 'dark', label: '暗色主题', icon: IconLight }
]

const Icon = computed(
  () => options.find((item) => item.value === settingsStore.settings.theme)?.icon
)

const renderLabel = (option: SelectOption & { icon: DefineComponent }): VNodeChild => {
  return (
    <NFlex align="center" size={8}>
      <option.icon /> {option.label}
    </NFlex>
  )
}

const handleUpdateTheme = (newTheme: Settings.Theme) => {
  settingsStore.setTheme(newTheme)
}
</script>

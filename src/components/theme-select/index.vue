<template>
  <n-popselect
    trigger="click"
    :value="settingsStore.settings.theme"
    :options="options"
    :render-label="renderLabel"
    @update:value="handleUpdateTheme"
  >
    <icon-wrap v-bind="attrs" round>
      <icon />
    </icon-wrap>
  </n-popselect>
</template>

<script setup lang="tsx">
import { computed, useAttrs, type Component, type DefineComponent, type VNodeChild } from 'vue'
import { NFlex, type SelectOption } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { IconWrap } from '@/components'
import { IconFollowSystem, IconDark, IconLight } from './icons'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const settingsStore = useSettingsStore()

const options: { value: Settings.Theme; label: string; icon: Component }[] = [
  { value: 'os', label: '跟随系统', icon: IconFollowSystem },
  { value: 'light', label: '亮色主题', icon: IconLight },
  { value: 'dark', label: '暗色主题', icon: IconDark }
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

const handleUpdateTheme = (newVal: Settings.Theme) => {
  settingsStore.setTheme(newVal)
}
</script>

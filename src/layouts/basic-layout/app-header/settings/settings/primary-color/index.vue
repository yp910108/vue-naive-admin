<template>
  <n-divider>主题颜色</n-divider>
  <ul class="flex flex-wrap gap-col-16px gap-row-12px">
    <li
      v-for="item of colorOptions"
      :key="item.color"
      class="flex-col-x-center gap-4px w-[calc((100%-32px)/3)]"
    >
      <box-select
        :checked="item.value === settings.primaryColor"
        class="w-full h-50px"
        @click="handleItemClick(item.value)"
      >
        <i
          class="w-20px h-20px bg-[var(--bg-color)] b-rd-[var(--border-radius)]"
          :style="{
            '--bg-color': item.color,
            '--border-radius': themeVars.borderRadius
          }"
        ></i>
      </box-select>
      <n-text depth="3" class="text-12px">{{ item.text }}</n-text>
    </li>
  </ul>
  <n-color-picker
    :value="color"
    :show-alpha="false"
    class="mt-12px"
    @update:value="handleUpdateColor"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { defaultSettings, darkThemeCommonVars, lightThemeCommonVars } from '@/settings'
import { useSettingsStore } from '@/store'
import { BoxSelect } from '../../components'
import { COLOR_OPTIONS } from './constants'

const themeVars = useThemeVars()

const settingsStore = useSettingsStore()

const { settings, theme } = storeToRefs(settingsStore)

const color = computed(() =>
  settings.value.primaryColor === 'default'
    ? themeVars.value.primaryColor
    : settings.value.primaryColor
)

const defaultColorOption = computed(() => {
  if (defaultSettings.primaryColor === 'default') {
    const themeCommonVars = theme.value === 'dark' ? darkThemeCommonVars : lightThemeCommonVars
    return { color: themeCommonVars.primaryColor, text: '默认', value: 'default' }
  } else {
    return {
      color: defaultSettings.primaryColor,
      text: '默认',
      value: defaultSettings.primaryColor
    }
  }
})

const colorOptions = computed(() => {
  return [
    defaultColorOption.value,
    ...COLOR_OPTIONS.map((item) => ({ ...item, value: item.color }))
  ]
})

const handleItemClick = (value: string) => {
  settingsStore.setPrimaryColor(value)
}

const handleUpdateColor = (newColor: string) => {
  settingsStore.setPrimaryColor(newColor)
}
</script>

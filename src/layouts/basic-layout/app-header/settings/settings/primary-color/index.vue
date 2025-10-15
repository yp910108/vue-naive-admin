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
    :value="settings.primaryColor === 'default' ? themeVars.primaryColor : settings.primaryColor"
    class="mt-12px"
    @update:value="handleUpdateColor"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { BoxSelect } from '../../components'
import { COLOR_OPTIONS } from './constants'
import { DARK_PRIMARY_COLOR, LIGHT_PRIMARY_COLOR } from '@/store/modules/theme/constants'

const themeVars = useThemeVars()

const settingsStore = useSettingsStore()

const { settings, theme } = storeToRefs(settingsStore)

const colorOptions = computed(() => {
  const defaultPrimaryColor = theme.value === 'dark' ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR
  return [
    { color: defaultPrimaryColor, text: '默认', value: 'default' },
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

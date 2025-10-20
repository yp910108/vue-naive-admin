<template>
  <n-divider>界面主题</n-divider>
  <ul class="flex gap-16px">
    <li
      v-for="item of options"
      :key="item.value"
      class="flex-col-x-center gap-4px w-[calc((100%-32px)/3)]"
    >
      <box-select
        :checked="item.value === settings.theme"
        class="w-full h-52px"
        @click="handleItemClick(item.value)"
      >
        <component :is="item.icon" class="text-20px" />
      </box-select>
      <n-text depth="3" class="text-12px">{{ item.label }}</n-text>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store'
import { BoxSelect } from '../../components'
import { IconFollowSystem, IconDark, IconLight } from './icons'

const settingsStore = useSettingsStore()

const { settings } = storeToRefs(settingsStore)

const options: { value: Settings.Theme; label: string; icon: Component }[] = [
  { value: 'os', label: '跟随系统', icon: IconFollowSystem },
  { value: 'light', label: '亮色主题', icon: IconLight },
  { value: 'dark', label: '暗色主题', icon: IconDark }
]

const handleItemClick = (value: Settings.Theme) => {
  settingsStore.setTheme(value)
}
</script>

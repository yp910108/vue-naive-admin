<template>
  <n-divider>界面主题</n-divider>
  <ul
    class="flex justify-between"
    :style="{
      '--border-color': themeVars.borderColor,
      '--border-color-hover': themeVars.primaryColor,
      '--border-radius': themeVars.borderRadius
    }"
  >
    <li v-for="item of options" :key="item.value" class="flex-col-x-center gap-4px cursor-pointer">
      <div
        class="flex-center w-100px h-52px b-1px b-[var(--border-color)] b-rd-[var(--border-radius)]"
      >
        <component :is="item.icon" class="text-20px" />
      </div>
      <n-text depth="3" class="text-12px">{{ item.label }}</n-text>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { useThemeVars } from 'naive-ui'
import { IconFollowSystem, IconDark, IconLight } from './icons'

const themeVars = useThemeVars()

const options: { value: Settings.Theme; label: string; icon: Component }[] = [
  { value: 'os', label: '跟随系统', icon: IconFollowSystem },
  { value: 'light', label: '亮色主题', icon: IconLight },
  { value: 'dark', label: '暗色主题', icon: IconDark }
]
</script>

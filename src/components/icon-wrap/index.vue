<template>
  <n-flex
    class="p-[var(--padding)] text-16px hover:bg-[var(--bg-color-hover)] b-rd-[var(--border-radius)] cursor-pointer"
    :style="{
      '--padding': `${padding}px`,
      '--bg-color-hover': themeVars.buttonColor2Hover,
      '--border-radius': round ? '50%' : themeVars.borderRadius
    }"
  >
    <slot></slot>
  </n-flex>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

withDefaults(defineProps<{ round?: boolean; padding?: number }>(), {
  padding: 8
})

const themeVars = useThemeVars()
</script>

<template>
  <n-flex
    class="p-8px text-16px hover:bg-[var(--bg-color)] b-rd-[var(--border-radius)] cursor-pointer"
    :style="{
      '--border-radius': themeVars.borderRadius,
      '--bg-color': themeVars.buttonColor2Hover
    }"
  >
    <slot></slot>
  </n-flex>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
</script>

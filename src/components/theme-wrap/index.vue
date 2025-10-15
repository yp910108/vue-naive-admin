<template>
  <div class="bg-[var(--bg-color)]" :style="{ '--bg-color': themeVars.cardColor }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
</script>

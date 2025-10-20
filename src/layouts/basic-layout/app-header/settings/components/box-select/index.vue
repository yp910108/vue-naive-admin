<template>
  <div class="settings-box-select" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeVars } from 'naive-ui'

const props = defineProps<{ checked?: boolean }>()

const themeVars = useThemeVars()

const cssVars = computed(() => ({
  '--border-width': props.checked ? '1.5px' : '1px',
  '--border-width-hover': '1.5px',
  '--border-color': props.checked ? themeVars.value.primaryColor : themeVars.value.borderColor,
  '--border-color-hover': themeVars.value.primaryColor,
  '--border-radius': themeVars.value.borderRadius
}))
</script>

<style lang="scss" scoped>
.settings-box-select {
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  &:hover {
    border-width: var(--border-width-hover);
    border-color: var(--border-color-hover);
  }
}
</style>

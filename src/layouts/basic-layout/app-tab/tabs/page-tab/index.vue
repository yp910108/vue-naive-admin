<template>
  <component :is="activeTab" v-bind="restProps" @close="emit('close')" :style="cssVars" />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { addColorAlpha, transformColorWithOpacity } from '@/utils'
import { useThemeStore } from '@/store'
import ChromeTab from './chrome-tab.vue'
import ButtonTab from './button-tab.vue'
import type { Emits, Props, TabMode } from './typing'

const props = withDefaults(defineProps<Props>(), {
  mode: 'chrome',
  closeable: true
})

const emit = defineEmits<Emits>()

const restProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mode, ...restProps } = props
  return restProps
})

type Components = Record<TabMode, Component>

const activeTab = computed(() => {
  const components: Components = {
    chrome: ChromeTab,
    button: ButtonTab
  }
  return components[props.mode]
})

const { theme } = storeToRefs(useThemeStore())

const cssVars = computed(() => {
  const primaryColor = theme.value.primaryColor
  return {
    '--primary-color': primaryColor,
    '--primary-color-1': transformColorWithOpacity(primaryColor, 0.1, '#fff'),
    '--primary-color-2': transformColorWithOpacity(primaryColor, 0.3, '#000'),
    '--primary-color-opacity-1': addColorAlpha(primaryColor, 0.1),
    '--primary-color-opacity-2': addColorAlpha(primaryColor, 0.15),
    '--primary-color-opacity-3': addColorAlpha(primaryColor, 0.3)
  }
})
</script>

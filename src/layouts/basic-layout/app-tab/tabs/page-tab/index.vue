<template>
  <component
    :is="activeTab"
    :darkMode="props.darkMode"
    :active="props.active"
    :style="cssVars"
    @close="emit('close')"
  >
    <template #icon>
      <component v-if="icon" :is="Icons[icon]" class="inline-block align-text-bottom text-16px" />
    </template>
    <slot>
      {{ title }}
    </slot>
    <template #close>
      <div
        v-if="closeable"
        class="relative inline-flex justify-center items-center w-16px h-16px text-14px rd-50% icon-close"
        @click.stop="emit('close')"
      >
        <icon-close />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { storeToRefs } from 'pinia'
import type { Settings } from '@/settings'
import { addColorAlpha, transformColorWithOpacity } from '@/utils'
import { useThemeStore } from '@/store'
import { Icons } from '@/components'
import ChromeTab from './chrome-tab.vue'
import ButtonTab from './button-tab.vue'
import IconClose from './icon-close.vue'

type TabMode = Settings['tab']['mode']

interface Props {
  mode?: TabMode
  darkMode?: boolean
  icon?: string
  title?: string
  active?: boolean
  closeable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'chrome',
  closeable: true
})

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

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

<template>
  <component :is="activeTab" v-bind="restProps" @close="emit('close')" />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
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
</script>

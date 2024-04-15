<template>
  <dark-mode-container class="flex flex-col h-full" :inverted="theme.sider.inverted">
    <logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :style="{ height: `${theme.header.height}px` }"
    />
    <vertical-menu />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'
import { DarkModeContainer } from '@/components'
import Logo from '../../components/logo.vue'
import VerticalMenu from './vertical-menu.vue'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())

const isHorizontalMix = computed(() => theme.value.layout.mode === 'horizontal-mix')
const showTitle = computed(
  () => !appStore.siderCollapse && theme.value.layout.mode !== 'vertical-mix'
)
</script>

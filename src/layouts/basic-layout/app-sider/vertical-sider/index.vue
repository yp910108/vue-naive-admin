<template>
  <dark-mode-container class="flex h-full" :inverted="theme.sider.inverted">
    <logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :style="{ height: `${theme.header.height}px` }"
    />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'
import Logo from '../../components/logo.vue'
import { computed } from 'vue'

const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const isHorizontalMix = computed(() => theme.value.layout.mode === 'horizontal-mix')
const showTitle = computed(
  () => !appStore.siderCollapse && theme.value.layout.mode !== 'vertical-mix'
)
</script>

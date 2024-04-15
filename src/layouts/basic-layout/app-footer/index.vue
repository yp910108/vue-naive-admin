<template>
  <dark-mode-container
    class="flex justify-center items-center h-full"
    :inverted="theme.footer.inverted"
  >
    <span>Copyright ©2023 Vue Naive Admin</span>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { DarkModeContainer } from '@/components'

defineOptions({ name: 'AppFooter' })

const { theme } = storeToRefs(useThemeStore())
</script>

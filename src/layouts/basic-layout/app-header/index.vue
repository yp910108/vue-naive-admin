<template>
  <dark-mode-container>
    <!-- <logo v-if="showLogo" show-title /> -->
    <div class="flex-1-hidden flex-y-center h-full">
      <menu-collapse v-if="showMenuCollapse && !isMobile" />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
// import Logo from '../components/logo.vue'
import MenuCollapse from './menu-collapse.vue'
import useMobile from '../mobile'

interface Props {
  showLogo: App.GlobalHeaderProps['showLogo']
  showHeaderMenu: App.GlobalHeaderProps['showHeaderMenu']
  showMenuCollapse: App.GlobalHeaderProps['showMenuCollapse']
}

defineProps<Props>()

const { isMobile } = useMobile()
</script>

<template>
  <dark-mode-container class="app-header flex-y-center h-full" :inverted="theme.header.inverted">
    <logo
      v-if="headerProps.showLogo"
      show-title
      class="h-full"
      :style="{ width: `${theme.sider.width}px` }"
    />
    <div v-if="!headerProps.showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <menu-collapse v-if="headerProps.showMenuCollapse || isMobile" />
      <breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <header-menu v-else />
    <div class="flex justify-end h-full">
      <search />
      <git-hub-site />
      <full-screen />
      <theme-mode />
      <lang-select with-hover-container />
      <system-message />
      <user-avatar />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import Logo from '../components/logo.vue'
import MenuCollapse from './menu-collapse.vue'
import Breadcrumb from './breadcrumb/index.vue'
import HeaderMenu from './header-menu.vue'
import Search from './search/index.vue'
import GitHubSite from './github-site.vue'
import FullScreen from './full-screen.vue'
import ThemeMode from './theme-mode.vue'
import SystemMessage from './system-message/index.vue'
import UserAvatar from './user-avatar.vue'
import { useMobile } from '../hooks'

defineOptions({ name: 'AppHeader' })

const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()

const LAYOUT_HEADER_PROPS = {
  vertical: {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: true
  },
  'vertical-mix': {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: false
  },
  horizontal: {
    showLogo: true,
    showHeaderMenu: true,
    showMenuCollapse: false
  },
  'horizontal-mix': {
    showLogo: true,
    showHeaderMenu: false,
    showMenuCollapse: true
  }
}

const headerProps = computed(() => LAYOUT_HEADER_PROPS[theme.value.layout.mode])
</script>

<style scoped>
.app-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>

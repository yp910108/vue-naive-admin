<template>
  <app-layout
    :mode="mode"
    :is-mobile="isMobile"
    :scroll-mode="theme.scrollMode"
    :scroll-el-id="appStore.scrollElId"
    :sider-visible="siderVisible"
    :sider-collapse="appStore.siderCollapse"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :fixed-top="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :content-full="appStore.contentFull"
    :content-class="appStore.disableMainXScroll ? 'overflow-x-hidden' : ''"
    :footer-visible="theme.footer.visible"
    :fixed-footer="theme.footer.fixed"
    @click-mobile-sider-mask="appStore.setSiderCollapse(true)"
  >
    <template #sider>
      <app-sider />
    </template>
    <template #header>
      <app-header />
    </template>
    <template #tab>
      <app-tab />
    </template>
    <app-content />
    <template #footer>
      <app-footer />
    </template>
  </app-layout>
  <n-back-top :key="theme.scrollMode" :listen-to="`#${appStore.scrollElId}`" class="z-100" />
  <app-settings v-if="settingsAble" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'
import AppContent from '../components/app-content/index.vue'
import { useMobile, useLayout } from './hooks'
import AppLayout from './app-layout/index.vue'
import AppHeader from './app-header/index.vue'
import AppSider from './app-sider/index.vue'
import AppTab from './app-tab/index.vue'
import AppFooter from './app-footer/index.vue'
import AppSettings from './app-settings/index.vue'

const appStore = useAppStore()

const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()

const { mode, siderVisible, siderWidth, siderCollapsedWidth } = useLayout()

const settingsAble = import.meta.env.DEV || import.meta.env.VITE_PROD_APP_SETTINGS === 'Y'
</script>

<style lang="scss">
@use '@/styles/scrollbar' as *;

#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}
</style>

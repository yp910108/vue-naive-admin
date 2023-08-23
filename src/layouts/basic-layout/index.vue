<template>
  <admin-layout
    :mode="mode"
    :is-mobile="isMobile"
    :scroll-mode="theme.scrollMode"
    :scroll-el-id="appStore.scrollElId"
    :full-content="appStore.contentFull"
    :sider-visible="siderVisible"
    :sider-collapse="appStore.siderCollapse"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :fixed-top="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :content-class="appStore.disableMainXScroll ? 'overflow-x-hidden' : ''"
    :footer-visible="theme.footer.visible"
    :fixed-footer="theme.footer.fixed"
    :right-footer="theme.footer.right"
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
  </admin-layout>
  <n-back-top :key="theme.scrollMode" :listen-to="`#${appStore.scrollElId}`" class="z-100" />
  <app-settings />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { AdminLayout } from '@soybeanjs/vue-materials'
import { useAppStore, useThemeStore } from '@/store'
import { useMobile, useLayout } from './hooks'
import AppHeader from './app-header/index.vue'
import AppSider from './app-sider/index.vue'
import AppTab from './app-tab/index.vue'
import AppContent from '../components/app-content/index.vue'
import AppFooter from './app-footer/index.vue'
import AppSettings from './app-settings/index.vue'

defineOptions({ name: 'BasicLayout' })

const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { isMobile } = useMobile()
const { mode, siderVisible, siderWidth, siderCollapsedWidth } = useLayout()
</script>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}
</style>

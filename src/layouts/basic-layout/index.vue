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
    <!-- <template #header>
      <app-header v-bind="headerProps" />
    </template> -->
    <template #sider>
      <app-sider />
    </template>
  </admin-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { AdminLayout } from '@soybeanjs/vue-materials'
import { useAppStore, useThemeStore } from '@/store'
// import AppHeader from './app-header/index.vue'
import AppSider from './app-sider/index.vue'
import useMobile from './mobile'
import useLayout from './layout'

defineOptions({ name: 'BasicLayout' })

const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { isMobile } = useMobile()
const { mode, siderVisible, siderWidth, siderCollapsedWidth, headerProps } = useLayout()
</script>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}
</style>

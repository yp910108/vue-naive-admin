<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settingDrawer.pageViewTitle') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.header.crumb.visible') }}</span>
      <n-switch
        :value="theme.header.crumb.visible"
        @update:value="themeStore.setHeaderCrumbVisible"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.header.crumb.icon') }}</span>
      <n-switch
        :value="theme.header.crumb.showIcon"
        @update:value="themeStore.setHeaderCrumbIconVisible"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.tab.visible') }}</span>
      <n-switch :value="theme.tab.visible" @update:value="themeStore.setTabVisible" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.tab.modeList.mode') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.tab.mode"
        :options="theme.tab.modeList"
        @update:value="themeStore.setTabMode"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.page.animate') }}</span>
      <n-switch :value="theme.page.animate" @update:value="themeStore.setPageIsAnimate" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.page.animateMode') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.page.animateMode"
        :options="theme.page.animateModeList"
        @update:value="themeStore.setPageAnimateMode"
      />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

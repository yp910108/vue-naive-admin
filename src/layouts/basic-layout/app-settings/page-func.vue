<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settingDrawer.pageFunctionsTitle') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.scrollMode') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.scrollMode"
        :options="theme.scrollModeList"
        @update:value="themeStore.setScrollMode"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.fixedHeaderAndTab') }}</span>
      <n-switch
        :value="theme.fixedHeaderAndTab"
        @update:value="themeStore.setIsFixedHeaderAndTab"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.menu.horizontalPosition') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="theme.menu.horizontalPositionList"
        @update:value="themeStore.setHorizontalMenuPosition"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.header.height') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="themeStore.setHeaderHeight"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.tab.height') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="themeStore.setTabHeight"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.tab.isCache') }}</span>
      <n-switch :value="theme.tab.isCache" @update:value="themeStore.setTabIsCache" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.sider.width') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="themeStore.setSiderWidth"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.sider.mixWidth') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="themeStore.setMixSiderWidth"
      />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.footer.visible') }}</span>
      <n-switch :value="theme.footer.visible" @update:value="themeStore.setFooterVisible" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.footer.fixed') }}</span>
      <n-switch :value="theme.footer.fixed" @update:value="themeStore.setFooterIsFixed" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.footer.right') }}</span>
      <n-switch :value="theme.footer.right" @update:value="themeStore.setFooterIsRight" />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

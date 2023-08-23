<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settingDrawer.themeModeTitle') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.darkMode') }}</span>
      <n-switch :value="theme.darkMode" @update:value="themeStore.setDarkMode">
        <template #checked>
          <icon-white-balance-sunny class="text-14px text-white" />
        </template>
        <template #unchecked>
          <icon-moon-waning-crescent class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.followSystemTheme') }}</span>
      <n-switch :value="theme.followSystemTheme" @update:value="themeStore.setFollowSystemTheme">
        <template #checked>
          <icon-baseline-do-not-disturb class="text-14px text-white" />
        </template>
        <template #unchecked>
          <icon-round-hdr-auto class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.isCustomizeDarkModeTransition') }}</span>
      <n-switch
        :value="theme.isCustomizeDarkModeTransition"
        @update:value="themeStore.setIsCustomizeDarkModeTransition"
      >
        <template #checked>
          <icon-baseline-do-not-disturb class="text-14px text-white" />
        </template>
        <template #unchecked>
          <icon-round-hdr-auto class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.sider.inverted') }}</span>
      <n-switch :value="theme.sider.inverted" @update:value="themeStore.setSiderInverted" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.header.inverted') }}</span>
      <n-switch :value="theme.header.inverted" @update:value="themeStore.setHeaderInverted" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settingDrawer.footer.inverted') }}</span>
      <n-switch :value="theme.footer.inverted" @update:value="themeStore.setFooterInverted" />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

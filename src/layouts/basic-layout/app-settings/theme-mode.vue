<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.themeMode.title') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.darkMode') }}</span>
      <n-switch :value="theme.darkMode" @update:value="themeStore.setDarkMode">
        <template #checked>
          <svg-icon icon="mdi:white-balance-sunny" class="text-14px text-white" />
        </template>
        <template #unchecked>
          <svg-icon icon="mdi:moon-waning-crescent" class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.followSystemTheme') }}</span>
      <n-switch :value="theme.followSystemTheme" @update:value="themeStore.setFollowSystemTheme">
        <template #checked>
          <svg-icon icon="ic:baseline-do-not-disturb" class="text-14px text-white" />
        </template>
        <template #unchecked>
          <svg-icon icon="ic:round-hdr-auto" class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.isCustomizeDarkModeTransition') }}</span>
      <n-switch
        :value="theme.isCustomizeDarkModeTransition"
        @update:value="themeStore.setIsCustomizeDarkModeTransition"
      >
        <template #checked>
          <svg-icon icon="ic:baseline-do-not-disturb" class="text-14px text-white" />
        </template>
        <template #unchecked>
          <svg-icon icon="ic:round-hdr-auto" class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.siderInverted') }}</span>
      <n-switch :value="theme.sider.inverted" @update:value="themeStore.setSiderInverted" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.headerInverted') }}</span>
      <n-switch :value="theme.header.inverted" @update:value="themeStore.setHeaderInverted" />
    </div>
    <div class="flex-y-center justify-between">
      <span>{{ $translate('layout.settings.themeMode.footerInverted') }}</span>
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

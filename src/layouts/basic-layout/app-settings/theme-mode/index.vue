<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.themeMode.title') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.themeMode.darkMode') }}</span>
      <n-switch :value="theme.darkMode" @update:value="themeStore.setDarkMode">
        <template #checked>
          <icon-sunny class="text-14px text-white" />
        </template>
        <template #unchecked>
          <icon-moon class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.themeMode.followSystemTheme') }}</span>
      <n-switch :value="theme.followSystemTheme" @update:value="themeStore.setFollowSystemTheme">
        <template #checked>
          <icon-not-disturb class="text-14px text-white" />
        </template>
        <template #unchecked>
          <icon-hdr-auto class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.themeMode.siderInverted') }}</span>
      <n-switch :value="theme.sider.inverted" @update:value="themeStore.setSiderInverted" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.themeMode.headerInverted') }}</span>
      <n-switch :value="theme.header.inverted" @update:value="themeStore.setHeaderInverted" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.themeMode.footerInverted') }}</span>
      <n-switch :value="theme.footer.inverted" @update:value="themeStore.setFooterInverted" />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import IconSunny from './icon-sunny.vue'
import IconMoon from './icon-moon.vue'
import IconNotDisturb from './icon-not-disturb.vue'
import IconHdrAuto from './icon-hdr-auto.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

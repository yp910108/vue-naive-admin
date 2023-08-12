<template>
  <n-divider title-placement="center">{{
    $t('layout.settingDrawer.pageFunctionsTitle')
  }}</n-divider>
  <n-space vertical size="large">
    <setting-menu :label="$t('layout.settingDrawer.scrollMode')">
      <n-select
        class="w-120px"
        size="small"
        :value="theme.scrollMode"
        :options="theme.scrollModeList"
        @update:value="themeStore.setScrollMode"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.fixedHeaderAndTab')">
      <n-switch
        :value="theme.fixedHeaderAndTab"
        @update:value="themeStore.setIsFixedHeaderAndTab"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.menu.horizontalPosition')">
      <n-select
        class="w-120px"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="theme.menu.horizontalPositionList"
        @update:value="themeStore.setHorizontalMenuPosition"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.header.height')">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="themeStore.setHeaderHeight"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.tab.height')">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="themeStore.setTabHeight"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.tab.isCache')">
      <n-switch :value="theme.tab.isCache" @update:value="themeStore.setTabIsCache" />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.sider.width')">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="themeStore.setSiderWidth"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.sider.mixWidth')">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="themeStore.setMixSiderWidth"
      />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.footer.visible')">
      <n-switch :value="theme.footer.visible" @update:value="themeStore.setFooterVisible" />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.footer.fixed')">
      <n-switch :value="theme.footer.fixed" @update:value="themeStore.setFooterIsFixed" />
    </setting-menu>
    <setting-menu :label="$t('layout.settingDrawer.footer.right')">
      <n-switch :value="theme.footer.right" @update:value="themeStore.setFooterIsRight" />
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { $t } from '@/locales'
import SettingMenu from '../setting-menu/index.vue'

defineOptions({ name: 'PageFunc' })

const themeStore = useThemeStore()

const { theme } = themeStore
</script>

<style scoped></style>

<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.pageFunc.title') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.scrollMode.title') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.scrollMode"
        :options="scrollModeList"
        @update:value="themeStore.setScrollMode"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.fixedHeaderAndTab') }}</span>
      <n-switch
        :value="theme.fixedHeaderAndTab"
        @update:value="themeStore.setIsFixedHeaderAndTab"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.menuHorizontalPosition.title') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="menuHorizontalPositionList"
        @update:value="themeStore.setHorizontalMenuPosition"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.headerHeight') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="themeStore.setHeaderHeight"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.tabHeight') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="themeStore.setTabHeight"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.tabIsCache') }}</span>
      <n-switch :value="theme.tab.isCache" @update:value="themeStore.setTabIsCache" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.siderWidth') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="themeStore.setSiderWidth"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.siderMixWidth') }}</span>
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="themeStore.setMixSiderWidth"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.footerVisible') }}</span>
      <n-switch :value="theme.footer.visible" @update:value="themeStore.setFooterVisible" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $translate('layout.settings.pageFunc.footerFixed') }}</span>
      <n-switch :value="theme.footer.fixed" @update:value="themeStore.setFooterIsFixed" />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Settings } from '@/settings'
import type { OptionWithKey } from '@/utils'
import { useThemeStore } from '@/store'

type ScrollMode = Settings['scrollMode']

type HorizontalMenuPosition = Settings['menu']['horizontalPosition']

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const scrollModeList = computed<OptionWithKey<ScrollMode>[]>(() => [
  {
    value: 'wrapper',
    label: $translate('layout.settings.pageFunc.scrollMode.wrapper')
  },
  {
    value: 'content',
    label: $translate('layout.settings.pageFunc.scrollMode.content')
  }
])

const menuHorizontalPositionList = computed<OptionWithKey<HorizontalMenuPosition>[]>(() => [
  {
    value: 'flex-start',
    label: $translate('layout.settings.pageFunc.menuHorizontalPosition.flexStart')
  },
  {
    value: 'center',
    label: $translate('layout.settings.pageFunc.menuHorizontalPosition.center')
  },
  {
    value: 'flex-end',
    label: $translate('layout.settings.pageFunc.menuHorizontalPosition.flexEnd')
  }
])
</script>

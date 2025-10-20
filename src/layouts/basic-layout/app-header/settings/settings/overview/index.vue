<template>
  <n-divider>界面显示</n-divider>
  <n-flex vertical :size="12">
    <n-flex justify="space-between" align="center">
      <n-text>侧边栏宽度</n-text>
      <n-input-number
        :value="settings.sider.width"
        :min="200"
        :max="350"
        :precision="0"
        :step="10"
        size="small"
        class="w-120px"
        @update:value="settingsStore.setSiderWidth"
      />
    </n-flex>
    <n-flex justify="space-between" align="center">
      <n-text>侧边栏 logo 高度</n-text>
      <n-input-number
        :value="settings.sider.logoHeight"
        :min="40"
        :max="60"
        :precision="0"
        :step="1"
        size="small"
        class="w-120px"
        @update:value="settingsStore.setSiderLogoHeight"
      />
    </n-flex>
    <n-flex justify="space-between" align="center">
      <n-text>头部高度</n-text>
      <n-input-number
        :value="settings.header.height"
        :min="40"
        :max="80"
        :precision="0"
        :step="1"
        size="small"
        class="w-120px"
        @update:value="settingsStore.setHeaderHeight"
      />
    </n-flex>
    <n-flex justify="space-between" align="center">
      <n-text>显示多页签</n-text>
      <n-switch :value="settings.tab.visible" @update:value="settingsStore.setTabVisible" />
    </n-flex>
    <template v-if="settings.tab.visible">
      <n-flex justify="space-between" align="center">
        <n-text>多页签高度</n-text>
        <n-input-number
          :value="settings.tab.height"
          :min="36"
          :max="50"
          :precision="0"
          :step="1"
          size="small"
          class="w-120px"
          @update:value="settingsStore.setTabHeight"
        />
      </n-flex>
    </template>
  </n-flex>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

const { settings } = storeToRefs(settingsStore)
</script>

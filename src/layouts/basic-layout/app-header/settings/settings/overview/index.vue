<template>
  <n-divider>界面显示</n-divider>
  <n-flex vertical>
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
        @update:value="handleUpdateSiderWidth"
      />
    </n-flex>
    <n-flex justify="space-between" align="center">
      <n-text>侧边栏折叠宽度</n-text>
      <n-input-number
        :value="settings.sider.collapsedWidth"
        :min="50"
        :max="80"
        :precision="0"
        :step="1"
        size="small"
        class="w-120px"
        @update:value="handleUpdateSiderCollapsedWidth"
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
        @update:value="handleUpdateSiderLogoHeight"
      />
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

const { settings } = storeToRefs(settingsStore)

const handleUpdateSiderWidth = (newSiderWidth: number | null) => {
  settingsStore.setSiderWidth(newSiderWidth)
}

const handleUpdateSiderCollapsedWidth = (newSiderCollapsedWidth: number | null) => {
  settingsStore.setSiderCollapsedWidth(newSiderCollapsedWidth)
}

const handleUpdateSiderLogoHeight = (newSiderLogoHeight: number | null) => {
  settingsStore.setSiderLogoHeight(newSiderLogoHeight)
}
</script>

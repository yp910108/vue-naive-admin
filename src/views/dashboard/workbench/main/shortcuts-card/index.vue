<template>
  <div
    class="flex flex-col justify-center items-center h-120px p-12px border-1px border-#efeff5 dark:border-#ffffff17 rounded-4px hover:shadow-sm cursor-pointer"
  >
    <component :is="iconComponents[icon]" :style="{ color: iconColor }" class="text-30px" />
    <p class="py-8px text-16px">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import IconMac from './icon-mac.vue'
import IconSetting from './icon-setting.vue'
import IconTree from './icon-tree.vue'
import IconAppStore from './icon-app-store.vue'
import IconTable from './icon-table.vue'
import IconChart from './icon-chart.vue'

interface Props {
  /**
   * 快捷操作名称
   */
  label: string
  /**
   * 图标
   */
  icon: string
  /**
   * 图标颜色
   */
  iconColor: string
}

defineProps<Props>()

type Components = Record<string, Component>

const iconComponents: Components = {
  mac: IconMac,
  setting: IconSetting,
  tree: IconTree,
  'app-store': IconAppStore,
  table: IconTable,
  chart: IconChart
}
</script>

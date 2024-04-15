<template>
  <div
    class="h-120px p-4px border-1px border-#efeff5 dark:border-#ffffff17 rounded-4px hover:shadow-sm cursor-pointer"
    @click="handleOpenSite"
  >
    <header class="flex items-center">
      <component :is="iconComponents[icon]" :style="{ color: iconColor }" class="text-30px" />
      <h3 class="pl-12px text-18px font-semibold">{{ name }}</h3>
    </header>
    <p class="py-8px h-56px text-#999">{{ description }}</p>
    <div class="flex justify-end">
      <span>{{ author }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import IconVue from './icon-vue.vue'
import IconTypescript from './icon-typescript.vue'
import IconVite from './icon-vite.vue'
import IconNaive from './icon-naive.vue'
import IconUno from './icon-uno.vue'
import IconPinia from './icon-pinia.vue'

interface Props {
  /**
   * 技术名称
   */
  name: string
  /**
   * 技术描述
   */
  description: string
  /**
   * 技术作者
   */
  author: string
  /**
   * 技术官网
   */
  site: string
  /**
   * 技术图标
   */
  icon: string
  /**
   * 图标颜色
   */
  iconColor?: string
}

const props = defineProps<Props>()

type Components = Record<string, Component>

const iconComponents: Components = {
  vue: IconVue,
  typescript: IconTypescript,
  vite: IconVite,
  naive: IconNaive,
  uno: IconUno,
  pinia: IconPinia
}

function handleOpenSite() {
  window.open(props.site, '_blank')
}
</script>

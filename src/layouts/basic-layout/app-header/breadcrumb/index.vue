<template>
  <n-breadcrumb class="px-12px">
    <n-breadcrumb-item v-for="breadcrumb of breadcrumbs" :key="breadcrumb.key">
      <n-dropdown
        v-if="breadcrumb.children && breadcrumb.children.length"
        :options="breadcrumb.children"
        @select="handleDropdownSelect"
      >
        <span>
          <component
            v-if="theme.header.crumb.showIcon && breadcrumb.icon"
            :is="breadcrumb.icon"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          {{ breadcrumb.label }}
        </span>
      </n-dropdown>
      <template v-else>
        <component
          v-if="theme.header.crumb.showIcon && breadcrumb.icon"
          :is="breadcrumb.icon"
          :class="[
            'inline-block align-text-bottom mr-4px text-16px',
            { 'text-#BBBBBB': theme.header.inverted }
          ]"
        />
        <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
          {{ breadcrumb.label }}
        </span>
      </template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore, useThemeStore } from '@/store'
import { getBreadcrumbsNyRouteName } from './helper'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const breadcrumbs = computed(() => {
  // @ts-ignore
  return getBreadcrumbsNyRouteName(route.name as string, menuStore.menus)
})

const handleDropdownSelect = (key: string) => {
  router.push({ name: key })
}
</script>

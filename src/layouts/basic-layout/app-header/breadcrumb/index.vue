<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="(breadcrumb, index) of breadcrumbs"
      :key="breadcrumb.key"
      :clickable="false"
      :class="index === breadcrumbs.length - 1 ? 'cursor-normal' : 'cursor-pointer'"
      @click="handleClick(breadcrumb)"
    >
      <n-flex align="center" :size="4">
        <component :is="breadcrumb.icon" class="text-16px" />
        {{ breadcrumb.label }}
      </n-flex>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/store'
import { getBreadcrumbsByRouteName } from './utils'

const route = useRoute()

const menuStore = useMenuStore()

const breadcrumbs = computed(() => {
  return getBreadcrumbsByRouteName(route.name as string, menuStore.menus)
})

const router = useRouter()

const handleClick = (breadcrumb: Menu.MenuOption) => {
  router.push({ name: breadcrumb.key })
}
</script>

<template>
  <router-link to="/" class="flex-y-center gap-8px px-16px">
    <img :src="ImgLogo" class="size-28px" />
    <n-h3 v-if="!appStore.siderCollapse" class="truncate" :style="{ '--n-margin': 0 }">
      {{ appName }}
    </n-h3>
  </router-link>
</template>

<script setup lang="ts">
import type { RouterLink } from 'vue-router'
import { ImgLogo } from '@/assets'
import { useAppStore } from '@/store'

const appName = import.meta.env.VITE_APP_NAME

const appStore = useAppStore()
</script>

<template>
  <!-- TODO collapse center -->
  <router-link to="/" class="flex-y-center gap-8px px-12px">
    <img :src="ImgLogo" class="w-32px" />
    <n-h3
      v-if="!appStore.siderCollapse"
      class="whitespace-nowrap overflow-hidden"
      :style="{ '--n-margin': 0 }"
    >
      {{ appName }}
    </n-h3>
  </router-link>
</template>

<script setup lang="ts">
import { ImgLogo } from '@/assets'
import { useAppStore } from '@/store'

const appName = import.meta.env.VITE_APP_NAME

const appStore = useAppStore()
</script>

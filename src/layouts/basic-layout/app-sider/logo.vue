<template>
  <router-link to="/" class="flex items-center gap-8px px-12px">
    <img :src="ImgLogo" class="w-32px h-32px" />
    <n-h3 :style="{ '--n-margin': 0 }">{{ appName }}</n-h3>
  </router-link>
</template>

<script setup lang="ts">
import { ImgLogo } from '@/assets'

const appName = import.meta.env.VITE_APP_NAME
</script>

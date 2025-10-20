<template>
  <div
    class="flex-col-center min-h-520px size-full overflow-hidden"
    :style="{ '--primary-color': themeVars.primaryColor }"
  >
    <div class="flex text-450px text-[var(--primary-color)]">
      <icon-not-found />
    </div>
    <router-link :to="{ name: 'Root' }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { IconNotFound } from './icons'

const themeVars = useThemeVars()
</script>

<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.colorSelect.title') }}
  </n-divider>
  <n-grid :cols="8" :x-gap="8" :y-gap="12">
    <n-grid-item v-for="color in colors" :key="color" class="flex-x-center">
      <div
        class="flex-center w-20px h-20px rounded-2px shadow cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="themeStore.setPrimaryColor(color)"
      >
        <icon-outline-check v-if="color === theme.primaryColor" class="text-white" />
      </div>
    </n-grid-item>
  </n-grid>
  <n-space :vertical="true" class="pt-12px">
    <n-color-picker
      :value="theme.primaryColor"
      :show-alpha="false"
      @update-value="themeStore.setPrimaryColor"
    />
  </n-space>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { colors } from '@/settings'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

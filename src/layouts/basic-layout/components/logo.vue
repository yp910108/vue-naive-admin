<template>
  <router-link
    to="/"
    class="flex justify-center items-center w-full whitespace-nowrap overflow-hidden"
    :style="{ '--primary-color': themeVars.primaryColor }"
  >
    <icon-logo class="text-22px text-[var(--primary-color)]" />
    <h2
      v-show="showTitle"
      class="pl-8px text-16px font-bold text-[var(--primary-color)] transition duration-300 ease-in-out"
    >
      {{ $translate('system.title') }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import IconLogo from './icon-logo.vue'

interface Props {
  showTitle?: boolean
}

defineProps<Props>()

const themeVars = useThemeVars()
</script>

<template>
  <router-link to="/" class="flex-center w-full nowrap-hidden">
    <icon-logo class="text-22px text-primary" />
    <h2
      v-show="showTitle"
      class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out"
    >
      {{ $translate('system.title') }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import IconLogo from './icon-logo.vue'

interface Props {
  showTitle?: boolean
}

defineProps<Props>()
</script>

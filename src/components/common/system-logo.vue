<template>
  <icon-logo-fill v-if="fill" />
  <icon-logo v-else />
</template>

<script setup lang="ts">
defineOptions({ name: 'SystemLogo' })

interface Props {
  fill?: boolean
}

withDefaults(defineProps<Props>(), {
  fill: false
})
</script>

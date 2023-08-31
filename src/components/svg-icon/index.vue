<template>
  <icon-render v-bind="props" />
</template>

<script setup lang="ts">
import { IconRender, type IconProps } from '@/utils'

defineOptions({ name: 'SvgIcon' })

const props = defineProps<IconProps>()
</script>

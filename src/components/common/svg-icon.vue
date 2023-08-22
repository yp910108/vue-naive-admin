<template>
  <icon v-bind="props" />
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import type { IconConfig } from '@/utils'
import { renderIcon } from '@/utils'

defineOptions({ name: 'SvgIcon' })

const props = defineProps<IconConfig>()

const Icon = defineComponent({
  name: '_SvgIcon',
  props: ['icon', 'fontSize', 'color'],
  setup(props) {
    if (!props.icon) {
      return () => h('i')
    } else {
      return renderIcon({ ...props })
    }
  }
})
</script>

<template>
  <div v-if="tooltipContent">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div :class="['flex-center h-full cursor-pointer dark:hover:bg-#333', contentClassName]">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else :class="['flex-center cursor-pointer dark:hover:bg-#333', contentClassName]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'
import { computed } from 'vue'

defineOptions({ name: 'HoverContainer' })

interface Props {
  tooltipContent?: string
  placement?: PopoverPlacement
  contentClass?: string
  inverted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom'
})

const contentClassName = computed(
  () => `${props.contentClass ?? ''} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`
)
</script>

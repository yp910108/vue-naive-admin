<template>
  <div
    :class="[
      'dark:bg-dark dark:text-white dark:text-opacity-82 transition-all',
      inverted ? 'bg-#001428 text-white' : 'bg-white text-#333639'
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  inverted?: boolean
}

withDefaults(defineProps<Props>(), {
  inverted: false
})
</script>

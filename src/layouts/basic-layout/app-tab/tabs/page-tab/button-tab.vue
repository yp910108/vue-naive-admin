<template>
  <div
    :class="[
      'relative inline-flex justify-center items-center gap-12px border-1px border-solid rounded-4px px-12px py-4px whitespace-nowrap cursor-pointer button-tab',
      {
        'button-tab_dark': darkMode,
        'button-tab_active': active,
        'button-tab_active_dark': darkMode && active
      }
    ]"
  >
    <svg-icon v-if="icon" :icon="icon" class="inline-block align-text-bottom text-16px" />
    {{ title }}
    <div
      v-if="closeable"
      class="relative inline-flex justify-center items-center w-16px h-16px text-14px rd-50% icon-close"
      @click.stop="emit('close')"
    >
      <icon-close-outlined />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Emits, TabProps } from './typing'

defineProps<TabProps>()

const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.button-tab {
  border-color: #e5e7eb;
  .icon-close:hover {
    font-size: 12px;
    background-color: var(--primary-color);
    color: #fff;
  }
  &:hover {
    border-color: var(--primary-color-opacity-3);
    color: var(--primary-color);
  }
  &.button-tab_active {
    border-color: var(--primary-color-opacity-3);
    background-color: var(--primary-color-opacity-1);
    color: var(--primary-color);
  }
  &.button-tab_dark {
    border-color: #ffffff3d;
    .icon-close {
      &:hover {
        color: #000;
      }
    }
    &:not(.button-tab_active_dark) {
      &:hover {
        border-color: var(--primary-color-opacity-3);
        color: var(--primary-color);
      }
    }
  }
  &.button-tab_active_dark {
    border-color: var(--primary-color-opacity-3);
    background-color: var(--primary-color-opacity-2);
  }
}
</style>

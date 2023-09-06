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
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="close"></slot>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  darkMode?: boolean
  active?: boolean
}

defineProps<Props>()

type SlotFn = () => any
type Slots = {
  icon?: SlotFn
  default?: SlotFn
  close?: SlotFn
}
defineSlots<Slots>()

// comment: hack for highlight
</script>

<style scoped lang="scss">
.button-tab {
  border-color: #e5e7eb;
  :deep(.icon-close):hover {
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
    :deep(.icon-close) {
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

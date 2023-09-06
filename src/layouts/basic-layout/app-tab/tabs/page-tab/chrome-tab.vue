<template>
  <div
    :class="[
      'relative inline-flex justify-center items-center gap-16px -mr-18px px-24px py-6px whitespace-nowrap cursor-pointer chrome-tab',
      {
        'chrome-tab_dark': darkMode,
        'chrome-tab_active': active,
        'chrome-tab_active_dark': darkMode && active
      }
    ]"
  >
    <div class="absolute left-0 top-0 -z-1 w-full h-full pointer-events-none chrome-tab__bg">
      <svg style="width: 100%; height: 100%">
        <defs>
          <symbol id="geometry-left" viewBox="0 0 214 36">
            <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"></path>
          </symbol>
          <symbol id="geometry-right" viewBox="0 0 214 36">
            <use xlink:href="#geometry-left"></use>
          </symbol>
          <clipPath>
            <rect width="100%" height="100%" x="0"></rect>
          </clipPath>
        </defs>
        <svg width="51%" height="100%">
          <use xlink:href="#geometry-left" width="214" height="36" fill="currentColor"></use>
        </svg>
        <g transform="scale(-1, 1)">
          <svg width="51%" height="100%" x="-100%" y="0">
            <use xlink:href="#geometry-right" width="214" height="36" fill="currentColor"></use>
          </svg>
        </g>
      </svg>
    </div>
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="close"></slot>
    <div class="absolute right-7px w-1px h-16px bg-#1f2225 chrome-tab-divider"></div>
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
.chrome-tab {
  .chrome-tab__bg {
    color: transparent;
  }
  :deep(.icon-close):hover {
    font-size: 12px;
    background-color: #9ca3af;
    color: #fff;
  }
  &:hover {
    z-index: 9;
    .chrome-tab__bg {
      color: #dee1e6;
    }
    .chrome-tab-divider {
      opacity: 0;
    }
  }
  &.chrome-tab_active {
    z-index: 10;
    color: var(--primary-color);
    .chrome-tab__bg {
      color: var(--primary-color-1);
    }
    :deep(.icon-close):hover {
      background-color: var(--primary-color);
    }
    .chrome-tab-divider {
      opacity: 0;
    }
  }
  &.chrome-tab_dark {
    &:not(.chrome-tab_active_dark) {
      &:hover {
        .chrome-tab__bg {
          color: #333;
        }
      }
    }
    :deep(.icon-close):hover {
      color: #000;
    }
    .chrome-tab-divider {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  &.chrome-tab_active_dark {
    .chrome-tab__bg {
      color: var(--primary-color-2);
    }
  }
}
</style>

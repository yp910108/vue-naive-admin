<template>
  <div
    :class="[
      'scroll-pane relative w-full',
      {
        'scroll-pane--shadow-start': !arrivedState.left,
        'scroll-pane--shadow-end': !arrivedState.right
      }
    ]"
    :style="{
      '--bezier': themeVars.cubicBezierEaseInOut
    }"
  >
    <v-x-scroll ref="scrollRef" class="h-full">
      <slot></slot>
    </v-x-scroll>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResizeObserver, useScroll } from '@vueuse/core'
import { VXScroll } from 'vueuc'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()

const scrollRef = ref<InstanceType<typeof VXScroll>>()

const scrollEl = computed(() => scrollRef.value?.$el as HTMLDivElement | undefined)

const { x, arrivedState, measure } = useScroll(scrollEl, { behavior: 'smooth' })

useResizeObserver(scrollEl, measure)

defineExpose({
  scrollEl,
  scrollTo: (newX: number) => {
    x.value = newX
  }
})
</script>

<style scoped lang="scss">
.scroll-pane::before,
.scroll-pane::after {
  content: '';
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  width: 20px;
  transition: box-shadow 0.3s var(--bezier);
  pointer-events: none;
}
.scroll-pane::before {
  left: 0;
}
.scroll-pane::after {
  right: 0;
}
.scroll-pane--shadow-start::before {
  box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.12);
}
.scroll-pane--shadow-end::after {
  box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.12);
}
</style>

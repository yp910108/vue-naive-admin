<template>
  <div ref="bsWrap" class="h-full text-left">
    <div ref="bsContent" :class="['inline-block', { 'h-full': !isScrollY }]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import BScroll, { type Options } from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(MouseWheel)

defineOptions({ name: 'BetterScroll' })

interface Props {
  /**
   * better-scroll 的配置: https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html
   */
  options: Options
}

const props = defineProps<Props>()

const bsWrap = ref<HTMLElement>()
const instance = ref<BScroll>()
const bsContent = ref<HTMLElement>()
const isScrollY = computed(() => props.options.scrollY)

const initBetterScroll = () => {
  if (!bsWrap.value) return
  instance.value = new BScroll(bsWrap.value, {
    ...props.options,
    mouseWheel: true
  })
}

const { width: wrapWidth, height: wrapHeight } = useElementSize(bsWrap)
const { width: contentWidth, height: contentHeight } = useElementSize(bsContent)
watch([wrapWidth, wrapHeight, contentWidth, contentHeight], () => {
  if (instance.value) {
    instance.value.refresh()
  }
})

onMounted(initBetterScroll)

defineExpose({ instance })
</script>

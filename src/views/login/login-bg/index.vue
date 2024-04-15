<template>
  <div class="absolute left-0 top-0 z-1 w-full h-full overflow-hidden">
    <div class="absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)">
      <corner-top :start-color="lightColor" :end-color="darkColor" />
    </div>
    <div class="absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)">
      <corner-bottom :start-color="darkColor" :end-color="lightColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getColorPalette } from '@/utils'
import CornerTop from './corner-top.vue'
import CornerBottom from './corner-bottom.vue'

interface Props {
  themeColor: string // 主题颜色
}

const props = defineProps<Props>()

const lightColor = computed(() => getColorPalette(props.themeColor, 3))
const darkColor = computed(() => getColorPalette(props.themeColor, 6))
</script>

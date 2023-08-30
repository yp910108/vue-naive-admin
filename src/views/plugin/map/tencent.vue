<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScriptTag } from '@vueuse/core'

const TENCENT_MAP_SDK_URL =
  'https://map.qq.com/api/gljs?v=1.exp&key=A6DBZ-KXPLW-JKSRY-ONZF4-CPHY3-K6BL7'

const { load } = useScriptTag(TENCENT_MAP_SDK_URL)

const domRef = ref<HTMLDivElement | null>(null)

async function renderMap() {
  await load(true)
  if (!domRef.value) return
  // @ts-ignore
  new TMap.Map(domRef.value, {
    // @ts-ignore
    center: new TMap.LatLng(39.98412, 116.307484),
    zoom: 11,
    viewMode: '3D'
  })
}

onMounted(() => {
  renderMap()
})
</script>

<style scoped></style>

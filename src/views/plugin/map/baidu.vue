<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScriptTag } from '@vueuse/core'

const BAIDU_MAP_SDK_URL = `https://api.map.baidu.com/getscript?v=3.0&ak=KSezYymXPth1DIGILRX3oYN9PxbOQQmU&services=&t=20210201100830&s=1`

const { load } = useScriptTag(BAIDU_MAP_SDK_URL)

const domRef = ref<HTMLDivElement>()

async function renderMap() {
  await load(true)
  if (!domRef.value) return
  // @ts-ignore
  const map = new BMap.Map(domRef.value)
  // @ts-ignore
  const point = new BMap.Point(114.05834626586915, 22.546789983033168)
  map.centerAndZoom(point, 15)
  map.enableScrollWheelZoom()
}

onMounted(() => {
  renderMap()
})
</script>

<style scoped></style>

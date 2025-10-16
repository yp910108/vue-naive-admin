<template>
  <router-link to="/" custom>
    <template #default="{ navigate }">
      <div ref="wrapRef" @click="navigate">
        <div
          class="flex-y-center gap-8px px-[var(--padding-x)] h-full"
          :style="{ '--padding-x': paddingX }"
        >
          <img ref="imgRef" :src="ImgLogo" class="min-w-28px w-32px" />
          <n-h3 v-if="!appStore.siderCollapse" class="truncate" :style="{ '--n-margin': 0 }">
            {{ appName }}
          </n-h3>
        </div>
      </div>
    </template>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RouterLink } from 'vue-router'
import { useElementSize } from '@vueuse/core'
import { ImgLogo } from '@/assets'
import { useAppStore } from '@/store'

const appName = import.meta.env.VITE_APP_NAME

const appStore = useAppStore()

const wrapRef = ref<HTMLDivElement>()

const wrapSize = useElementSize(wrapRef)

const imgRef = ref<HTMLImageElement>()

const imgSize = useElementSize(imgRef)

const paddingX = computed(() => {
  if (appStore.siderCollapse) {
    const delX = wrapSize.width.value - imgSize.width.value
    return `${delX / 2}px`
  } else {
    return '12px'
  }
})
</script>

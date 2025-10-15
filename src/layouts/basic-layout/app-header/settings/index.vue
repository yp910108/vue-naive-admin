<template>
  <icon-wrap v-bind="attrs" round @click="handleShowSettings">
    <icon-settings />
  </icon-wrap>
  <settings ref="settingsRef" />
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import { IconWrap } from '@/components'
import { IconSettings } from './icons'
import Settings from './settings/index.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const settingsRef = ref<InstanceType<typeof Settings>>()

const handleShowSettings = () => {
  settingsRef.value?.show()
}
</script>

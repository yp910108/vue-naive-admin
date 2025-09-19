<template>
  <n-button :text="true" class="h-36px" @click="appStore.toggleSiderCollapse">
    <icon-right v-if="appStore.siderCollapse" icon="ph:caret-double-right-bold" class="text-16px" />
    <icon-left v-else icon="ph:caret-double-left-bold" class="text-16px" />
  </n-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import IconLeft from './icon-left.vue'
import IconRight from './icon-right.vue'

const appStore = useAppStore()
</script>

<template>
  <n-spin :show="spinning" class="h-full" content-class="h-full">
    <iframe class="size-full" :src="src" @load="handleLoad"></iframe>
  </n-spin>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { localStg } from '@/utils'

interface Props {
  src?: string
}

const props = defineProps<Props>()

const src = computed(() => props.src?.replace('{token}', localStg.get('token')!))

const spinning = ref(true)

const handleLoad = () => {
  spinning.value = false
}
</script>

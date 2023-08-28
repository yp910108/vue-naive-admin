<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="搜索"
    :inverted="theme.header.inverted"
    @click="handleSearch"
  >
    <icon-search class="text-20px" />
    <modal ref="modalRef" />
  </hover-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import Modal from './modal/index.vue'

const { theme } = storeToRefs(useThemeStore())

const modalRef = ref<InstanceType<typeof Modal>>()

const handleSearch = () => {
  modalRef.value?.show()
}
</script>

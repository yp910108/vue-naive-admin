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
import Modal from './modal.vue'
import { onMounted } from 'vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const modalRef = ref<InstanceType<typeof Modal>>()

const handleSearch = () => {
  modalRef.value?.show()
}

onMounted(() => {
  modalRef.value?.show()
})
</script>

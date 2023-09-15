<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="$translate('layout.header.search.tooltip')"
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
import { HoverContainer } from '@/components'
import IconSearch from './component/icon-search.vue'
import Modal from './modal/index.vue'

const { theme } = storeToRefs(useThemeStore())

const modalRef = ref<InstanceType<typeof Modal>>()

const handleSearch = () => {
  modalRef.value?.show()
}
</script>

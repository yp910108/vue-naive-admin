<template>
  <icon-wrap @click="handleShowSearch">
    <icon-search />
    <modal ref="modalRef" />
  </icon-wrap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconWrap } from '@/components'
import { IconSearch } from './icons'
import Modal from './modal/index.vue'

const modalRef = ref<InstanceType<typeof Modal>>()

const handleShowSearch = () => {
  modalRef.value?.show()
}
</script>

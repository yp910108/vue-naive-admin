<template>
  <n-drawer v-model:show="visible" :width="380">
    <n-drawer-content title="偏好设置">
      <appearance />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Appearance from './appearance/index.vue'

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>

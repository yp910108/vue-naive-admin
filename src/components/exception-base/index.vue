<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <svg-icon v-if="type === '403'" icon="no-permission" />
      <svg-icon v-if="type === '404'" icon="not-found" />
      <svg-icon v-if="type === '500'" icon="service-error" />
    </div>
    <router-link :to="{ name: 'Root' }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ExceptionBase' })

type ExceptionType = '403' | '404' | '500'

interface Props {
  type: ExceptionType
}

defineProps<Props>()
</script>

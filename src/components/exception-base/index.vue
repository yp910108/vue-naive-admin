<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <icon-no-permission v-if="type === '403'" />
      <icon-not-found v-if="type === '404'" />
      <icon-service-error v-if="type === '500'" />
    </div>
    <router-link :to="{ name: 'Root' }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import IconNoPermission from './icon-no-permission.vue'
import IconNotFound from './icon-not-found.vue'
import IconServiceError from './icon-service-error.vue'

defineOptions({ name: 'ExceptionBase' })

type ExceptionType = '403' | '404' | '500'

interface Props {
  type: ExceptionType
}

defineProps<Props>()
</script>

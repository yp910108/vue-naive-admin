<template>
  <icon-wrap round>
    <n-avatar size="small" round :src="avatarUrl">
      <icon-avatar v-if="!avatarUrl" class="text-16px" />
    </n-avatar>
  </icon-wrap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconWrap } from '@/components'
import { IconAvatar } from './icons'

const avatarUrl = ref('https://avatars.githubusercontent.com/u/38527563?v=4')
</script>

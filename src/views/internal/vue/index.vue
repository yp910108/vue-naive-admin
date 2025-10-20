<template>
  <div class="h-full">
    <iframe class="w-full h-full" :src="src"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const src = ref('https://cn.vuejs.org')
</script>

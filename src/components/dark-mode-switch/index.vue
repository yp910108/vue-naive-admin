<template>
  <div class="flex-center text-18px cursor-pointer" @click="handleSwitch">
    <icon-moon v-if="darkMode" />
    <icon-sunny v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'DarkModeSwitch' })

interface Props {
  dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dark: false
})

interface Emits {
  (e: 'update:dark', darkMode: boolean): void
}

const emit = defineEmits<Emits>()

const darkMode = computed({
  get() {
    return props.dark
  },
  set(newVal: boolean) {
    emit('update:dark', newVal)
  }
})

const handleSwitch = async () => {
  darkMode.value = !darkMode.value
}
</script>

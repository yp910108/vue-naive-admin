<template>
  <div class="flex justify-center items-center text-18px cursor-pointer" @click="handleSwitch">
    <icon-moon v-if="darkMode" />
    <icon-sunny v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { localStg } from '@/utils'
import IconSunny from './icon-sunny.vue'
import IconMoon from './icon-moon.vue'

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
    localStg.set('theme', newVal ? 'dark' : 'light')
    emit('update:dark', newVal)
  }
})

const handleSwitch = async () => {
  darkMode.value = !darkMode.value
}
</script>

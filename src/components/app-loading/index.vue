<template>
  <div
    class="fixed left-0 top-0 flex flex-col justify-center items-center w-full h-full"
    :style="{ '--primary-color': primaryColor }"
  >
    <icon-logo icon="logo" class="text-128px text-[var(--primary-color)]" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClses"
          :key="index"
          :class="[
            'absolute w-16px h-16px rounded-8px bg-[var(--primary-color)] animate-pulse',
            item
          ]"
        ></div>
      </div>
    </div>
    <h2 class="font-500 text-28px text-#646464">
      {{ $translate('system.title') }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { settings } from '@/settings'
import { sessionStg } from '@/utils'
import { $translate } from '@/locales'
import IconLogo from './icon-logo.vue'

defineOptions({ name: 'AppLoading' })

const loadingClses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
]

const primaryColor = (sessionStg.get('settings') ?? settings).primaryColor
</script>

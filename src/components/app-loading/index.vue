<template>
  <div class="fixed-center flex-col">
    <svg-icon icon="logo" class="text-128px text-primary" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClses"
          :key="index"
          :class="['absolute w-16px h-16px rounded-8px bg-primary animate-pulse', item]"
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
import { sessionStg, getRgbOfColor } from '@/utils'
import { $translate } from '@/locales'

defineOptions({ name: 'AppLoading' })

const loadingClses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
]

function addPrimaryColorCssVar() {
  const _settings = sessionStg.get('settings') ?? settings

  const { r, g, b } = getRgbOfColor(_settings.primaryColor)

  document.documentElement.style.setProperty('--primary-color', `${r}, ${g}, ${b}`)
}

addPrimaryColorCssVar()
</script>

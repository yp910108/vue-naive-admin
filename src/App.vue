<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, type WritableComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { zhCN, dateZhCN } from 'naive-ui'
import { useThemeStore, subscribeStore } from './store'

const { locale } = useI18n()

const naiveLocale = computed(() => {
  return (locale as WritableComputedRef<Lang.Type>).value === 'zhCN' ? zhCN : null
})

const naiveDateLocale = computed(() => {
  return (locale as WritableComputedRef<Lang.Type>).value === 'zhCN' ? dateZhCN : null
})

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

subscribeStore()
</script>

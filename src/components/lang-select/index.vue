<template>
  <n-popselect trigger="click" :value="value" :options="options" @update:value="handleUpdateValue">
    <icon-wrap>
      <icon-lang />
    </icon-wrap>
  </n-popselect>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { setLocale } from '@/locales'
import { localStg } from '@/utils'
import { IconWrap } from '@/components'
import { IconLang } from './icons'

const options: { value: Lang.Type; label: string }[] = [
  { value: 'zhCN', label: '简体中文' },
  { value: 'enUS', label: 'English' }
]

const value = ref<Lang.Type>(localStg.get('lang') ?? 'zhCN')

const handleUpdateValue = (key: Lang.Type) => {
  value.value = key
  setLocale(key)
  localStg.set('lang', key)
}
</script>

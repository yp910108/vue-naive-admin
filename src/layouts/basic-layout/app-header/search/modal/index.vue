<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    footer-style="padding: 0; margin: 0"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    :class="[
      'fixed left-0 right-0',
      isMobile ? 'w-full h-full top-0px rounded-0' : 'w-630px top-50px'
    ]"
    @after-leave="handeAfterLeave"
  >
    <n-input-group>
      <n-input
        v-model:value="keyword"
        clearable
        :placeholder="$translate('layout.header.search.modal.keywordPlaceholder')"
        @input="handleSearch"
      >
        <template #prefix>
          <icon-search class="text-15px text-#c2c2c2" />
        </template>
      </n-input>
      <n-button v-if="isMobile" type="primary" ghost @click="hide">
        {{ $translate('layout.header.search.modal.cancelButton') }}
      </n-button>
    </n-input-group>
    <div class="mt-20px">
      <n-empty
        v-if="!resultOptions?.length"
        :description="$translate('layout.header.search.modal.empty')"
      />
      <result v-else v-model:value="activeKey" :options="resultOptions" @enter="handleEnter" />
    </div>
    <template #footer>
      <search-footer v-if="!isMobile" />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { isExternal } from '@/utils'
import { useMenuStore, type SearchMenuOption } from '@/store'
import { useMobile } from '../../../hooks'
import IconSearch from '../component/icon-search.vue'
import Result from './result/index.vue'
import SearchFooter from './footer/index.vue'

const router = useRouter()

const menuStore = useMenuStore()

const { isMobile } = useMobile()

const visible = ref(false)

const keyword = ref<string | null>()
const activeKey = ref<string>()
const resultOptions = shallowRef<SearchMenuOption[]>()

const search = () => {
  resultOptions.value = menuStore.searchMenus.filter(({ label }) => {
    if (keyword.value) {
      const _keyword = keyword.value?.toLocaleLowerCase().trim()
      return label.toLocaleLowerCase().includes(_keyword)
    } else {
      return false
    }
  })
  if (resultOptions.value.length > 0) {
    activeKey.value = resultOptions.value[0].key
  } else {
    activeKey.value = undefined
  }
}

const handleSearch = useDebounceFn(search)

const handleUp = () => {
  if (!resultOptions.value?.length) return
  const index = resultOptions.value?.findIndex((item) => item.key === activeKey.value)
  if (index === 0) {
    activeKey.value = resultOptions.value?.[resultOptions.value?.length - 1].key
  } else {
    activeKey.value = resultOptions.value?.[index - 1].key
  }
}

const handleDown = () => {
  if (!resultOptions.value?.length) return
  const index = resultOptions.value?.findIndex((item) => item.key === activeKey.value)
  if (index + 1 === resultOptions.value?.length) {
    activeKey.value = resultOptions.value[0].key
  } else {
    activeKey.value = resultOptions.value[index + 1].key
  }
}

const handeAfterLeave = () => {
  keyword.value = null
  resultOptions.value = undefined
}

const handleEnter = () => {
  if (!resultOptions.value?.length || !activeKey.value) return
  const { key, routePath } = resultOptions.value.find((item) => item.key === activeKey.value)!
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  } else {
    router.push({ name: key })
  }
  hide()
}

onKeyStroke('ArrowUp', handleUp)
onKeyStroke('ArrowDown', handleDown)
onKeyStroke('Enter', handleEnter)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>

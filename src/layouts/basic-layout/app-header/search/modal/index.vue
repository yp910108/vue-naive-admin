<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    :footer-style="{ padding: 0, margin: 0 }"
    class="fixed left-0 top-50px right-0 w-650px"
    @after-leave="handeAfterLeave"
  >
    <n-input-group>
      <n-input
        v-model:value="keyword"
        clearable
        placeholder="请输入关键词搜索"
        @input="handleSearch"
      >
        <template #prefix>
          <icon-search class="text-15px text-#c2c2c2" />
        </template>
      </n-input>
    </n-input-group>
    <div class="mt-20px">
      <n-empty v-if="!resultOptions?.length" description="暂无搜索结果" />
      <result v-else v-model:value="activeKey" :options="resultOptions" @enter="handleEnter" />
    </div>
    <template #footer>
      <search-footer />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { isExternal } from '@/utils'
import { useMenuStore } from '@/store'
import { IconSearch } from '../icons'
import Result from './result/index.vue'
import SearchFooter from './footer/index.vue'

const router = useRouter()

const menuStore = useMenuStore()

const visible = ref(false)

const keyword = ref<string | null>()

const activeKey = ref<string>()

const resultOptions = shallowRef<Menu.SearchMenuOption[]>()

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

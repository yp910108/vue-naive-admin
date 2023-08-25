<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <naive-provider-content>
            <slot></slot>
          </naive-provider-content>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useDialog, useLoadingBar, useNotification, useMessage } from 'naive-ui'

defineOptions({ name: 'NaiveProvider' })

function registerNaiveTools() {
  window.$dialog = useDialog()
  window.$loadingBar = useLoadingBar()
  window.$notification = useNotification()
  window.$message = useMessage()
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup(_, { slots }) {
    registerNaiveTools()
    return () => h('div', { class: 'h-full' }, slots.default?.())
  }
})
</script>

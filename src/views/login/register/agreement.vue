<template>
  <div class="w-full text-14px">
    <n-checkbox v-model:checked="checked">{{ $translate('login.register.agreement') }}</n-checkbox>
    <n-button :text="true" type="primary" @click="handleClickProtocol">
      {{ $translate('login.register.protocol') }}
    </n-button>
    <n-button :text="true" type="primary" @click="handleClickPolicy">
      {{ $translate('login.register.policy') }}
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { $translate } from '@/locales'

interface Props {
  /**
   * 是否勾选
   */
  value?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: true
})

interface Emits {
  (e: 'update:value', value: boolean): void
  /**
   * 点击协议
   */
  (e: 'click-protocol'): void
  /**
   * 点击隐私政策
   */
  (e: 'click-policy'): void
}

const emit = defineEmits<Emits>()

const checked = computed({
  get() {
    return props.value
  },
  set(newValue: boolean) {
    emit('update:value', newValue)
  }
})

const handleClickProtocol = () => {
  emit('click-protocol')
}
const handleClickPolicy = () => {
  emit('click-policy')
}
</script>

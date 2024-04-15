<template>
  <div class="flex items-center px-24px h-44px">
    <span class="flex items-center mr-14px">
      <icon-return class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.return') }}</span>
    </span>
    <span class="flex items-center mr-14px">
      <icon-up class="icon text-20px p-2px mr-5px" />
      <icon-down class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.arrow') }}</span>
    </span>
    <span class="flex items-center">
      <icon-esc class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.esc') }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import IconReturn from './icon-return.vue'
import IconUp from './icon-up.vue'
import IconDown from './icon-down.vue'
import IconEsc from './icon-esc.vue'
</script>

<style scoped lang="scss">
.icon {
  box-shadow:
    inset 0 -2px #cdcde6,
    inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
}
</style>

<template>
  <div class="px-24px h-44px flex-y-center">
    <span class="mr-14px flex-y-center">
      <svg-icon icon="mdi:keyboard-return" class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.return') }}</span>
    </span>
    <span class="mr-14px flex-y-center">
      <svg-icon icon="mdi:arrow-up-thin" class="icon text-20px p-2px mr-5px" />
      <svg-icon icon="mdi:arrow-down-thin" class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.arrow') }}</span>
    </span>
    <span class="flex-y-center">
      <svg-icon icon="mdi:keyboard-esc" class="icon text-20px p-2px mr-6px" />
      <span>{{ $translate('layout.header.search.modal.action.esc') }}</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.icon {
  box-shadow:
    inset 0 -2px #cdcde6,
    inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
}
</style>

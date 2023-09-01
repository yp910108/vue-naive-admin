<template>
  <n-space :vertical="true">
    <n-divider class="!mb-0 text-14px text-#666">
      {{ $translate('login.pwdLogin.otherAccountLogin') }}
    </n-divider>
    <n-space justify="center">
      <n-button
        v-for="item in accounts"
        :key="item.userName"
        type="primary"
        @click="login(item.userName, item.password)"
      >
        {{ $translate(item.label) }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import type { RoleType } from '@/store'

interface Emits {
  (e: 'login', param: { userName: string; password: string }): void
}

const emit = defineEmits<Emits>()

interface Account {
  key: RoleType
  label: string
  userName: string
  password: string
}

const accounts: Account[] = [
  {
    key: 'super',
    label: 'login.pwdLogin.superAdmin',
    userName: 'Super',
    password: 'super123'
  },
  {
    key: 'admin',
    label: 'login.pwdLogin.admin',
    userName: 'Admin',
    password: 'admin123'
  },
  {
    key: 'user',
    label: 'login.pwdLogin.user',
    userName: 'User01',
    password: 'user01123'
  }
]

const login = (userName: string, password: string) => {
  emit('login', { userName, password })
}
</script>

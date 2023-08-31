<template>
  <AppButton
    v-if="isLoggedIn"
    @click="logOut"
  >
    {{ translate('component.header.logout') }}
  </AppButton>
  <RouterLink
    v-else
    :to="{ name: LOGIN_VIEW }"
  >
    {{ translate('component.header.login') }}
  </RouterLink>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import { LOGIN_VIEW } from '@shared/router/names'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

function logOut() {
  authStore.logOut()
}
</script>

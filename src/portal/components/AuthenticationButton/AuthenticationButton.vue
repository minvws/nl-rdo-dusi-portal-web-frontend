<template>
  <AppButton
    v-if="isLoggedIn"
    @click="logOut"
  >
    {{ translate('component.header.logout') }}
  </AppButton>
  <a
    v-else
    :href="loginUrl"
  >
    {{ translate('component.header.login') }}
  </a>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@portal/store/useAuthStore'
import { useApiLoginUrl } from '@shared/composables/useApiUrl'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const authStore = useAuthStore()
const loginUrl = useApiLoginUrl()

const { isLoggedIn } = storeToRefs(authStore)

function logOut() {
  authStore.logOut()
}
</script>

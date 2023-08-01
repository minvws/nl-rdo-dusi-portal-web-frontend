<template>
  <AppButton
    v-if="authStore.isLoggedIn"
    @click="authStore.logOut"
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

<script lang="ts" setup>
import { useAuthStore } from '@/store/useAuthStore'
import { useApiLoginUrl } from '@/composables/useApiUrl'
import { translate } from '@/i18n'

import AppButton from '@/components/AppButton/AppButton.vue'

const authStore = useAuthStore()
const loginUrl = useApiLoginUrl()
</script>

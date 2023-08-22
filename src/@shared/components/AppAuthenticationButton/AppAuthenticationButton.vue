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
import { useAuthStore } from '@shared/store/useAuthStore'
import { useApiLoginUrl } from '@portal/composables/usePortalApiUrl'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const authStore = useAuthStore()
const loginUrl = useApiLoginUrl()
</script>
@portal/composables/usePortalApiUrl

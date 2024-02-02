<template>
  <AppButton
    v-if="isLoggedIn"
    @click="logOut"
  >
    {{ t('component.header.logout') }}
  </AppButton>
  <RouterLink
    v-else
    :to="{ name: LOGIN_VIEW }"
  >
    {{ t('component.header.login') }}
  </RouterLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import { LOGIN_VIEW } from '@assessment/router/names'

const { t } = useI18n()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

function logOut() {
  authStore.logOut()
}
</script>

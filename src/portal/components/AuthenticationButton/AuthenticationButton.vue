<template>
  <AppButton @click="onButtonClick">
    {{ buttonLabel }}
  </AppButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@portal/store/useAuthStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

function onButtonClick() {
  isLoggedIn.value ? authStore.logOut() : authStore.onAuthenticate()
}

const buttonLabel = computed<string>(() => {
  const id = isLoggedIn.value ? 'logout' : 'login'
  return t(`component.header.${id}`)
})
</script>

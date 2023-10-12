<template>
  <AppButton @click="onButtonClick">
    {{ buttonLabel }}
  </AppButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const authStore = useAuthStore()
const { logOut, onAuthenticate } = authStore
const { isLoggedIn } = storeToRefs(authStore)

function onButtonClick() {
  isLoggedIn.value ? logOut() : onAuthenticate()
}
}

const buttonLabel = computed(() => {
  const id = isLoggedIn.value ? 'logout' : 'login'
  return translate(`component.header.${id}`)
})
</script>

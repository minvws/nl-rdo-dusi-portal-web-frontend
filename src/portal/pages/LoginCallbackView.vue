<template>
  <div />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@portal/store/useAuthStore'
import { getRouteFromCookie } from '@shared/utils/cookie'
import { HOME } from '@shared/router/names'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { translate } from '@shared/i18n'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const route = useRoute()
const router = useRouter()

function getError() {
  switch (route.query?.error) {
    case 'login_cancelled':
    case 'login_failed':
      return route.query.error.split('_')[1]
  }
}

function getErrorMessage() {
  const error = getError()
  if (!error) return
  return `authentication.${error}`
}

onBeforeMount(async () => {
  const message = getErrorMessage()

  if (message) {
    notificationsStore.add({
      displayAs: 'error',
      label: translate(`${message}.label`) ?? '',
      message: translate(`${message}.message`) ?? ''
    })
    await authStore.logOut()
  } else {
    await authStore.logIn()
  }

  const route = !message && authStore.isLoggedIn ? getRouteFromCookie() : undefined
  router.replace(route ?? { name: HOME })
})
</script>

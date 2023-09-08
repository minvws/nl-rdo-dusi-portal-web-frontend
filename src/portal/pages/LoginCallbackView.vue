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

function getErrorCode(error: string) {
  switch (error) {
    case 'login_cancelled':
    case 'login_failed':
      return error.split('_')[1]
    default:
      return 'unknown'
  }
}
function getError() {
  const error = route.query?.error as string
  if (!error) return undefined
  const code = getErrorCode(error)
  return {
    code,
    error
  }
}

onBeforeMount(async () => {
  const authError = getError()

  if (authError) {
    const { code } = authError
    notificationsStore.add({
      displayAs: 'error',
      label: translate(`authentication.${code}.label`, authError) ?? '',
      message: translate(`authentication.${code}.message`, authError) ?? ''
    })
    await authStore.logOut()
  } else {
    await authStore.logIn()
  }

  const route = !authError && authStore.isLoggedIn ? getRouteFromCookie() : undefined
  router.replace(route ?? { name: HOME })
})
</script>

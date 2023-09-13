<template>
  <div />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'
import { useAuthStore } from '@portal/store/useAuthStore'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { getRouteFromCookie } from '@shared/utils/cookie'
import { HOME } from '@shared/router/names'
import { translate } from '@shared/i18n'

import { AuthError, type AuthErrorType, AuthMinimumLoaQuery } from '@shared/types/auth'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const route = useRoute()
const router = useRouter()

function getErrorCode(error: AuthErrorType) {
  switch (error) {
    case AuthError.LOGIN_CANCELLED:
    case AuthError.LOGIN_FAILED:
    case AuthError.MINIMUM_LOA:
      return error
    default:
      return AuthError.UNKNOWN
  }
}

function getErrorParams(error: AuthErrorType, query: LocationQuery) {
  if (error !== AuthError.MINIMUM_LOA) return {}
  return Object.values(AuthMinimumLoaQuery).reduce((cul, key) => {
    const value = query[key]
    if (!value) return cul
    return {
      ...cul,
      [key]: translate(`authentication.loa.types.${value}`)
    }
  }, {})
}

function getError() {
  const error = route.query?.error as AuthErrorType
  if (!error) return undefined
  const code = getErrorCode(error)
  const params = getErrorParams(code, route.query)
  return {
    code,
    error,
    ...params
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

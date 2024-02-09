<template>
  <div />
</template>

<script setup lang="ts">
import type { LocationQuery } from 'vue-router'
import type { AuthError } from '@shared/types/auth'

import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@portal/store/useAuthStore'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { getRouteFromCookie } from '@shared/utils/route-cookie'

import { HOME } from '@shared/router/names'

import { AuthErrorType, AuthLoaQueryType } from '@shared/types/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const route = useRoute()
const router = useRouter()

function getErrorCode(error: AuthError): AuthError {
  switch (error) {
    case AuthErrorType.LOGIN_CANCELLED:
    case AuthErrorType.LOGIN_FAILED:
    case AuthErrorType.MINIMUM_LOA: {
      return error
    }
    default: {
      return AuthErrorType.UNKNOWN
    }
  }
}

function getErrorParams(error: AuthError, query: LocationQuery): Record<string, string> {
  if (error !== AuthErrorType.MINIMUM_LOA) {
    return {}
  }

  let acc: Record<string, any> = {}

  for (const key of Object.values(AuthLoaQueryType)) {
    const value = query[key]
    if (value) {
      acc[key] = t(`authentication.loa.types.${value}`)
    }
  }

  return acc
}

function getError(): undefined | Record<string, string> {
  const error = route.query?.error as AuthError

  if (!error) {
    return undefined
  }

  const code = getErrorCode(error)
  const params = getErrorParams(code, route.query)

  return {
    code,
    error,
    ...params
  }
}

async function handleAuthentication(): Promise<void> {
  const authError = getError()
  const cookieRoute = getRouteFromCookie()

  if (authError) {
    const { code } = authError
    notificationsStore.add({
      id: 'login-error',
      displayAs: 'error',
      label: t(`authentication.${code}.label`, authError),
      message: t(`authentication.${code}.message`, authError)
    })
    await authStore.logOut()
  } else {
    await authStore.logIn()
  }

  const route = !authError && authStore.isLoggedIn ? cookieRoute : undefined

  router.replace(route ?? { name: HOME })
}

onBeforeMount(() => handleAuthentication())
</script>

<template>
  <div />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import cookie from 'js-cookie'

import { useAuthStore } from '@/store/useAuthStore'
import { useApiUserStatusUrl } from '@/composables/useApiUrl'

import { ROUTES_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/constants'

const authStore = useAuthStore()
const url = useApiUserStatusUrl()
const router = useRouter()

onBeforeMount(async () => {
  const response = await fetch(url, { method: 'GET', credentials: 'include' })
  const data = await response.json()

  const routeCookie = cookie.get(ROUTES_COOKIE_NAME) || ''
  const route = JSON.parse(routeCookie)

  if (data?.logged_in && route) {
    const { name, params, query } = route
    const fifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000)
    const value = JSON.stringify({ timestamp: `${fifteenMinutes}` })

    authStore.setLoggedIn(true)
    cookie.set(SESSION_COOKIE_NAME, value, { expires: fifteenMinutes })
    router.push({ name, params, query })
  }
})
</script>

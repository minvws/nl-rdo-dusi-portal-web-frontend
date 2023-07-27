<template>
  <div />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import cookie from 'js-cookie'

import { useAuthStore } from '@/store/useAuthStore'
import { useApiUserStatusUrl } from '@/composables/useApiUrl'

import { ROUTES_COOKIE_NAME } from '@/constants'

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
    authStore.setLoggedIn(true)
    router.push({ name, params, query })
  }
})
</script>

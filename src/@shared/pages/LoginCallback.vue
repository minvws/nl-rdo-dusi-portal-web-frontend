<template>
  <div />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@shared/store/useAuthStore'
import { getRouteFromCookie } from '@shared/utils/cookie'
import { HOME } from '@shared/router/names'

const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(async () => {
  await authStore.logIn()
  const route = authStore.isLoggedIn ? getRouteFromCookie() : undefined
  router.replace(route ?? { name: HOME })
})
</script>

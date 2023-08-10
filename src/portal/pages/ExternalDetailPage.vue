<template>
  <section>
    <div>
      <p>Deze detail pagina wordt extern gehost. Dit is enkel een placeholder</p>
      <pre>{{ $props }}</pre>
      <AppAuthenticationButton v-if="!authStore.isLoggedIn" />
      <RouterLink
        v-else
        :to="route"
        >Ga verder</RouterLink
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@shared/store/useAuthStore'

import AppAuthenticationButton from '@shared/components/AppAuthenticationButton/AppAuthenticationButton.vue'

import { ARRANGEMENT_DETAILS } from '@shared/router/names'

const props = defineProps<{ id: string }>()

const authStore = useAuthStore()

const route = computed(() => {
  return {
    name: ARRANGEMENT_DETAILS,
    params: props
  }
})
</script>

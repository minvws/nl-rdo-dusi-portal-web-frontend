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
import AppAuthenticationButton from '@/components/AppAuthenticationButton/AppAuthenticationButton.vue'
import { ARRANGEMENT_DETAILS } from '@/router/names'
import { useAuthStore } from '@/store/useAuthStore'
import { computed } from 'vue'

const props = defineProps<{ id: string }>()

const authStore = useAuthStore()

const route = computed(() => {
  return {
    name: ARRANGEMENT_DETAILS,
    params: props
  }
})
</script>

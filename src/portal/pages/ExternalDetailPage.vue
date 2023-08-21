<template>
  <section>
    <div>
      <p>Deze detail pagina wordt extern gehost. Dit is enkel een placeholder</p>
      <pre>{{ $props }}</pre>
      <a
        v-if="link"
        v-bind="link"
        >Bekijk de regeling
      </a>
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
import { Rel } from '@/@shared/external-links'

const props = defineProps<{ id: string; url?: string }>()

const authStore = useAuthStore()

const route = computed(() => {
  return {
    name: ARRANGEMENT_DETAILS,
    params: props
  }
})

const link = computed(() => {
  if (!props.url) return undefined
  return {
    href: props.url,
    rel: [Rel.EXTERNAL, Rel.NO_OPENER, Rel.NO_REFERRER].join(' ')
  }
})
</script>

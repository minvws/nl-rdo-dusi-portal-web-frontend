<template>
  <section>
    <div>
      <p>Deze detail pagina wordt extern gehost. Dit is enkel een placeholder</p>
      <pre>{{ { id, link } }}</pre>
      <a
        v-if="externalLink"
        v-bind="externalLink"
        >Bekijk de regeling
      </a>
      <AppAuthenticationButton v-if="!authStore.isLoggedIn" />
      <RouterLink
        v-else
        :to="assessmentDetailRoute"
        >Ga verder
      </RouterLink>
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

const assessmentDetailRoute = computed(() => {
  return {
    name: ARRANGEMENT_DETAILS,
    params: props
  }
})

const link = computed(() => (props.url ? atob(props.url) : undefined))

const externalLink = computed(() => {
  const href = link.value
  if (!href) return undefined
  return {
    href,
    rel: [Rel.EXTERNAL, Rel.NO_OPENER, Rel.NO_REFERRER].join(' ')
  }
})
</script>

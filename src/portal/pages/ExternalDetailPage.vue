<template>
  <section>
    <div>
      <p>Deze detail pagina wordt extern gehost. Dit is enkel een placeholder</p>
      <pre>{{ { id, link } }}</pre>
      <a
        v-if="externalLink"
        v-bind="externalLink"
      >
        Bekijk de regeling
      </a>
      <AuthenticationButton v-if="!authStore.isLoggedIn" />
      <RouterLink
        v-else
        :to="assessmentDetailRoute"
      >
        Ga verder
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@portal/store/useAuthStore'

import AuthenticationButton from '@portal/components/AuthenticationButton/AuthenticationButton.vue'

import { ARRANGEMENT_DETAILS } from '@portal/router/names'
import { Rel } from '@shared/external-links'

const rel = [Rel.EXTERNAL, Rel.NO_OPENER, Rel.NO_REFERRER].join(' ')

type Props = {
  id: string
  url?: string
}

const props = defineProps<Props>()

const authStore = useAuthStore()

const assessmentDetailRoute = computed(() => ({
  name: ARRANGEMENT_DETAILS,
  params: props
}))

const link = computed(() => (props.url ? atob(props.url) : undefined))

const externalLink = computed(() => (link.value ? { href: link.value, rel } : undefined))
</script>

<template>
  <section>
    <div>
      <p>Regeling details for {{ route.params.id }}</p>
      <RouterLink
        :to="requestLocalFormRoute"
        class="button ghost"
      >
        Aanvragen (local)
      </RouterLink>
      <RouterLink
        :to="requestRemoteFormRoute"
        class="button ghost"
      >
        Aanvragen (remote)</RouterLink
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { translate } from '@/shared/i18n'

import useSEO from '@/shared/composables/useSeo'

import { ARRANGEMENT_FORM_LOCAL, ARRANGEMENT_FORM_REMOTE } from '@/shared/router/names'

const route = useRoute()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.arrangement-details.title')} - ${
    route.params.id
  }`
})

const requestLocalFormRoute = computed(() => {
  return {
    name: ARRANGEMENT_FORM_LOCAL,
    params: { id: route.params.id }
  }
})

const requestRemoteFormRoute = computed(() => {
  return {
    name: ARRANGEMENT_FORM_REMOTE,
    params: { id: route.params.id }
  }
})
</script>

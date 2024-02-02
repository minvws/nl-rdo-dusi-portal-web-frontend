<template>
  <section>
    <div>
      <h2>Regeling details for {{ route.params.id }}</h2>
      <h4>Local forms:</h4>
      <RouterLink
        class="button ghost"
        text="Aanvragen post-covid"
        :to="requestLocalFormPostCovidRoute"
      />
      <RouterLink
        class="button ghost"
        text="Aanvragen borst-prothesen-transvrouwen"
        :to="requestLocalFormBTVRoute"
      />

      <h4>Remote form:</h4>
      <RouterLink
        class="button ghost"
        text="Aanvragen"
        :to="requestRemoteFormRoute"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import { ARRANGEMENT_FORM_LOCAL, ARRANGEMENT_FORM_REMOTE } from '@portal/router/names'

const { t } = useI18n()
const route = useRoute()

useSEO({
  title: `${route.params.id} - ${t('pages.arrangement-details.title')} | ${t('app.prefix')}`
})

const requestLocalFormPostCovidRoute = computed<RouteLocationRaw>(() => ({
  name: ARRANGEMENT_FORM_LOCAL,
  params: { id: route.params.id, name: 'post-covid' }
}))

const requestLocalFormBTVRoute = computed<RouteLocationRaw>(() => ({
  name: ARRANGEMENT_FORM_LOCAL,
  params: { id: route.params.id, name: 'borst-prothesen-transvrouwen' }
}))

const requestRemoteFormRoute = computed<RouteLocationRaw>(() => ({
  name: ARRANGEMENT_FORM_REMOTE,
  params: { id: route.params.id }
}))
</script>

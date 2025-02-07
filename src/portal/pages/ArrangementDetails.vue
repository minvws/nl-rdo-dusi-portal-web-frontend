<template>
  <section>
    <div>
      <h2>Regeling: {{ route.params.name }}</h2>
      <h4>Local form:</h4>
      <RouterLink
        class="button ghost"
        text="Aanvragen"
        :to="requestLocalFormRoute"
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

import { ARRANGEMENT_FORM_LOCAL } from '@portal/router/names'

const { t } = useI18n()
const route = useRoute()

useSEO({ title: `${t('pages.arrangement-details.title')} | ${t('app.prefix')}` })

const requestLocalFormRoute = computed<RouteLocationRaw>(() => ({
  name: ARRANGEMENT_FORM_LOCAL,
  params: { name: route.params.name }
}))
</script>

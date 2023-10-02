<template>
  <section>
    <AppIntro
      v-bind="{
        title: translate('pages.my-requests-overview.title'),
        intro: translate('pages.my-requests-overview.intro')
      }"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <template #title>
        <h2>{{ translate('pages.my-requests-overview.myRequests') }}</h2>
      </template>
      <RequestCards
        v-bind="{
          headings,
          data
        }"
      />
      <template #fallback>
        <p>{{ translate('pages.my-requests-overview.noRequests') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchRequests } from '@portal/composables/useFetchRequests'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestCards from '@portal/components/RequestCards/RequestCards.vue'

useSEO({
  title: `${translate('pages.my-requests-overview.title')} | ${translate('app.prefix')}`
})

const { data, error, isFetching } = useFetchRequests()

const headings = computed(() =>
  [
    { id: 'subsidy', sortable: false },
    { id: 'file', sortable: false },
    { id: 'created', sortable: false },
    { id: 'deadline', sortable: false },
    { id: 'status', sortable: false },
    { id: 'actionRequired', sortable: false },
    { id: 'action', sortable: false }
  ].map(item => ({
    ...item,
    text: translate(`pages.my-requests-overview.table.${item.id}`)
  }))
)
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

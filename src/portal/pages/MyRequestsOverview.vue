<template>
  <section>
    <AppIntro
      :title="t('pages.my-requests-overview.title')"
      :intro="t('pages.my-requests-overview.intro')"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <template #title>
        <h2>{{ t('pages.my-requests-overview.myRequests') }}</h2>
      </template>
      <RequestCards
        :headings="headings"
        :data="data"
      />
      <template #fallback>
        <p>{{ t('pages.my-requests-overview.noRequests') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { Column } from '@shared/types/table'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchRequests } from '@portal/composables/useFetchRequests'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestCards from '@portal/components/RequestCards/RequestCards.vue'

const columns = [
  { id: 'subsidy', sortable: false },
  { id: 'file', sortable: false },
  { id: 'created', sortable: false },
  { id: 'final_review_deadline', sortable: false },
  { id: 'status', sortable: false },
  { id: 'updated_at', sortable: false },
  { id: 'actionRequired', sortable: false },
  { id: 'action', sortable: false }
]

const { t } = useI18n()
const { data, error, isFetching } = useFetchRequests()

useSEO({
  title: `${t('pages.my-requests-overview.title')} | ${t('app.prefix')}`
})

const headings = computed<Column[]>(() =>
  columns.map((item) => ({
    ...item,
    text: t(`pages.my-requests-overview.table.${item.id}`)
  }))
)
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

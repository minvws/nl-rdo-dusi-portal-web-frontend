<template>
  <section>
    <div>
      <h1>{{ translate('pages.all-cases-overview.title') }}</h1>
      <p>{{ translate('pages.all-cases-overview.subtitle') }}</p>
    </div>
    <AppSuspense v-bind="{ data: filters, error: filtersError, isFetching: isFetchingFilters }">
      <FilterTabs
        :items="filters"
        :selected="params?.id"
        @change="onFilterChange"
      />
    </AppSuspense>
    <AppSuspense v-bind="{ data: casesData, error: casesError, isFetching: isFetchingCases }">
      <AppTable
        :data="casesData"
        :columns="headings"
        :items-per-page="10"
      />
      <template #fallback>
        <p>{{ translate('pages.all-cases-overview.noCases') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useFetchAllCases } from '@assessment/composables/useFetchAllCases'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'

import type { FilterItem } from '@shared/types/filters'

const headings = [
  { id: 'file', text: translate('pages.all-cases-overview.headings.file'), sortable: true },
  {
    id: 'arrangement',
    text: translate('pages.all-cases-overview.headings.arrangement'),
    sortable: true
  },
  { id: 'status', text: translate('pages.all-cases-overview.headings.status'), sortable: true },
  { id: 'deadline', text: translate('pages.all-cases-overview.headings.deadline'), sortable: true },
  { id: 'updated', text: translate('pages.all-cases-overview.headings.updated'), sortable: true },
  { id: 'reviewer', text: translate('pages.all-cases-overview.headings.reviewer'), sortable: true }
]

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.all-cases-overview.title')}` })

const { data: filters, error: filtersError, isFetching: isFetchingFilters } = useFetchFilters()
const {
  data: casesData,
  error: casesError,
  isFetching: isFetchingCases,
  params
} = useFetchAllCases(filters)

function onFilterChange(item: FilterItem) {
  const { id } = item
  params.value = { id }
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
</style>

<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-cases-overview.title') }}</h1>
      <p>{{ translate('pages.my-cases-overview.subtitle') }}</p>
    </div>
    <AppSuspense v-bind="{ data: filters, error: filtersError, isFetching: isFetchingFilters }">
      <FilterTabs
        :items="filters"
        :selected="params?.id"
        @change="onFilterChange"
      />
    </AppSuspense>
    <div>
      <FilterOptions
        type="cases"
        v-model="query"
      >
        <p v-if="query">
          <span>{{ numberOfCases }}</span>
          {{ translate('pages.my-cases-overview.cases', {}, numberOfCases) }}
        </p>
        <AppButton
          :data-show-filters-label="translate('pages.my-cases-overview.showFilters')"
          aria-expanded="false"
        >
          {{ translate('pages.my-cases-overview.showFilters') }}
        </AppButton>
      </FilterOptions>
    </div>
    <AppSuspense v-bind="{ data: casesData, error: casesError, isFetching: isFetchingCases }">
      <AppTable
        :data="casesData"
        :columns="headings"
        :items-per-page="10"
      />
      <template #fallback>
        <p>{{ translate('pages.my-cases-overview.noCases') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useFetchMyCases } from '@assessment/composables/useFetchMyCases'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'

import type { FilterItem } from '@shared/types/filters'

const headings = [
  { id: 'file', text: translate('pages.my-cases-overview.headings.file'), sortable: true },
  {
    id: 'arrangement',
    text: translate('pages.my-cases-overview.headings.arrangement'),
    sortable: true
  },
  { id: 'status', text: translate('pages.my-cases-overview.headings.status'), sortable: true },
  {
    id: 'deadline',
    text: translate('pages.my-cases-overview.headings.deadline'),
    sortable: true
  },
  { id: 'updated', text: translate('pages.my-cases-overview.headings.updated'), sortable: true },
  { id: 'action', text: translate('pages.my-cases-overview.headings.action'), sortable: false }
]

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-cases-overview.title')}` })

const { data: filters, error: filtersError, isFetching: isFetchingFilters } = useFetchFilters()
const {
  data: casesData,
  error: casesError,
  isFetching: isFetchingCases,
  query,
  params
} = useFetchMyCases(filters)

const numberOfCases = computed(() => casesData.value.length ?? 0)

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

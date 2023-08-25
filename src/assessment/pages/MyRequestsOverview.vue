<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-requests-overview.title') }}</h1>
      <p>{{ translate('pages.my-requests-overview.subtitle') }}</p>
    </div>
    <AppSuspense v-bind="{ data: filters, error: filtersError, isFetching: isFetchingFilters }">
      <FilterTabs
        :items="filters"
        @change="onFilterChange"
      />
    </AppSuspense>
    <div>
      <FilterOptions
        type="requests"
        v-model="query"
      >
        <p>
          <span>{{ numberOfCases }}</span>
          {{ translate('pages.my-requests-overview.cases', {}, numberOfCases) }}
        </p>
        <AppButton
          :data-show-filters-label="translate('pages.my-requests-overview.showFilters')"
          aria-expanded="false"
        >
          {{ translate('pages.my-requests-overview.showFilters') }}
        </AppButton>
      </FilterOptions>
    </div>
    <AppSuspense
      v-bind="{ data: assessments, error: assessmentsError, isFetching: isFetchingAssessments }"
    >
      <AppTable
        :data="assessments"
        :columns="headings"
        :items-per-page="10"
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

import useSEO from '@shared/composables/useSeo'
import { useFetchMyAssessments } from '@assessment/composables/useFetchMyAssessments'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'

import type { FilterItem } from '@shared/types/filters'

const headings = [
  { id: 'file', text: translate('pages.my-requests-overview.headings.file'), sortable: true },
  {
    id: 'arrangement',
    text: translate('pages.my-requests-overview.headings.arrangement'),
    sortable: true
  },
  { id: 'status', text: translate('pages.my-requests-overview.headings.status'), sortable: true },
  {
    id: 'deadline',
    text: translate('pages.my-requests-overview.headings.deadline'),
    sortable: true
  },
  { id: 'updated', text: translate('pages.my-requests-overview.headings.updated'), sortable: true },
  { id: 'action', text: translate('pages.my-requests-overview.headings.action'), sortable: false }
]

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-requests-overview.title')}` })

const {
  data: assessments,
  error: assessmentsError,
  isFetching: isFetchingAssessments,
  query
} = useFetchMyAssessments()

const { data: filters, error: filtersError, isFetching: isFetchingFilters } = useFetchFilters()

const numberOfCases = computed(() => assessments.value.length ?? 0)

function onFilterChange(item: FilterItem) {
  const { id } = item
  console.log('@TODO: onFilterChange for id', id)
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
</style>

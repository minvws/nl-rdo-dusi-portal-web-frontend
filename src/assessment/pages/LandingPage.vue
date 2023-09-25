<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p>{{ translate('pages.home.subtitle') }}</p>
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
        type="all-cases"
        v-model="query"
      >
        <p v-if="query">
          <span>{{ numberOfCases }}</span>
          {{ translate('pages.home.cases', {}, numberOfCases) }}
        </p>
        <AppButton
          :data-show-filters-label="translate('pages.home.showFilters')"
          aria-expanded="false"
        >
          {{ translate('pages.home.showFilters') }}
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
        <p>{{ translate('pages.home.noCases') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { FilterItem } from '@shared/types/filters'

import { computed } from 'vue'
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useFetchAllCases } from '@assessment/composables/useFetchAllCases'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'

const headings = [
  { id: 'file', text: translate('pages.home.headings.file'), sortable: true },
  { id: 'arrangement', text: translate('pages.home.headings.arrangement'), sortable: true },
  { id: 'status', text: translate('pages.home.headings.status'), sortable: true },
  { id: 'deadline', text: translate('pages.home.headings.deadline'), sortable: true },
  { id: 'updated', text: translate('pages.home.headings.updated'), sortable: true },
  { id: 'reviewer', text: translate('pages.home.headings.reviewer'), sortable: true }
]

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.home.title')}` })

const { data: filters, error: filtersError, isFetching: isFetchingFilters } = useFetchFilters()
const {
  data: casesData,
  error: casesError,
  isFetching: isFetchingCases,
  query,
  params
} = useFetchAllCases(filters)

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

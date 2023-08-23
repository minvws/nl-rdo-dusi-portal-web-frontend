<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-requests-overview.title') }}</h1>
      <p>{{ translate('pages.my-requests-overview.subtitle') }}</p>
    </div>
    <div v-if="filters.length">
      <FilterTabs
        :items="filters"
        @change="onFilterChange"
      />
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <div v-else-if="error">
          <FormNotification
            display-as="error"
            :message="error"
          />
        </div>
        <div v-else>
          <FilterOptions
            type="requests"
            v-model="query"
          >
            <p>
              <span>{{ data?.length ?? 0 }}</span>
              {{ translate('pages.my-requests-overview.cases', {}, data?.length ?? 0) }}
            </p>
            <AppButton
              :data-show-filters-label="translate('pages.my-requests-overview.showFilters')"
              aria-expanded="false"
            >
              {{ translate('pages.my-requests-overview.showFilters') }}
            </AppButton>
          </FilterOptions>
          <AppTable
            v-if="data?.length"
            :data="data"
            :columns="headings"
            :items-per-page="10"
          />
          <div v-else>
            <p>
              {{ translate('pages.my-requests-overview.noRequests') }}
            </p>
          </div>
        </div>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'
import useSEO from '@shared/composables/useSeo'

import { useFetchMyAssessments } from '@assessment/composables/useFetchMyAssessments'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import type { FilterItem } from '@shared/types/filters'

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-requests-overview.title')}` })

const { data, error, query, isFetching } = useFetchMyAssessments()

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

const { data: filters } = useFetchFilters()

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

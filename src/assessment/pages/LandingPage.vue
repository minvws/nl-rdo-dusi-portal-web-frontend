<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p>{{ translate('pages.home.subtitle') }}</p>
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
            type="all-requests"
            v-model="query"
          >
            <p>
              <span>{{ data?.length ?? 0 }}</span>
              {{ translate('pages.home.cases', {}, data?.length ?? 0) }}
            </p>
            <AppButton
              :data-show-filters-label="translate('pages.home.showFilters')"
              aria-expanded="false"
            >
              {{ translate('pages.home.showFilters') }}
            </AppButton>
          </FilterOptions>
          <div v-if="!data?.length">
            <p>
              {{ translate('pages.home.noRequests') }}
            </p>
          </div>
          <AppTable
            v-else
            :data="data"
            :columns="headings"
            :items-per-page="10"
          />
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

import { useFetchAllAssessments } from '@assessment/composables/useFetchAllAssessments'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import type { FilterItem } from '@shared/types/filters'

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.home.title')}` })

const { data, error, query, isFetching } = useFetchAllAssessments()
const { data: filters } = useFetchFilters()

const headings = [
  { id: 'file', text: translate('pages.home.headings.file'), sortable: true },
  { id: 'arrangement', text: translate('pages.home.headings.arrangement'), sortable: true },
  { id: 'status', text: translate('pages.home.headings.status'), sortable: true },
  { id: 'deadline', text: translate('pages.home.headings.deadline'), sortable: true },
  { id: 'updated', text: translate('pages.home.headings.updated'), sortable: true },
  { id: 'reviewer', text: translate('pages.home.headings.reviewer'), sortable: true }
]

function onFilterChange(item: FilterItem) {
  const { id } = item
  console.log('@TODO: on filter change', id)
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
</style>

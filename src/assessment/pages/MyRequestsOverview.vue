<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-requests-overview.title') }}</h1>
      <p>{{ translate('pages.my-requests-overview.subtitle') }}</p>
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="!isFetching && data">
          <FilterTabs
            v-if="filterCounts"
            :items="filterCounts"
            v-model="selectedFilter"
            show-all
            :total-count="data.items.length"
          />
          <div
            class="filter"
            v-filters
          >
            <div>
              <p>
                <span>{{ filteredItems.length }}</span>
                {{ translate('pages.my-requests-overview.cases') }}
              </p>
              <AppButton
                :data-show-filters-label="translate('pages.my-requests-overview.showFilters')"
                aria-expanded="false"
              >
                {{ translate('pages.my-requests-overview.showFilters') }}
              </AppButton>
            </div>
            <form>
              <p>@TODO: filters</p>
            </form>
          </div>
          <AppTable
            :data="filteredItems"
            :columns="headings"
            :items-per-page="10"
          />
        </div>
        <p v-else>
          {{ translate('pages.my-requests-overview.noRequests') }}
        </p>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useApiMyAssessmentRequestsUrl } from '@shared/composables/useApiUrl'

import vFilters from '@shared/directives/filters'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'

import { useTableStore } from '@shared/store/useTableStore'

const tableStore = useTableStore()
const url = useApiMyAssessmentRequestsUrl()

tableStore.fetchRequests(url)

const { data, isFetching, error, filterCounts, selectedFilter, filteredItems, headings } =
  storeToRefs(tableStore)

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-requests-overview.title')}` })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
</style>

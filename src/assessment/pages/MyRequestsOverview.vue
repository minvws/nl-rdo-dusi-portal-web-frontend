<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-requests-overview.title') }}</h1>
      <p>{{ translate('pages.my-requests-overview.subtitle') }}</p>
    </div>
    <div>
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
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="!isFetching && assessments.length">
          <RequestFilter>
            <div>
              <p>
                <span>{{ assessments.length }}</span>
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
          </RequestFilter>
          <AppTable
            v-if="assessments.length"
            :data="assessments"
            :columns="headings"
            :items-per-page="10"
          />
          <div v-else>
            <p>
              {{ translate('pages.my-requests-overview.noRequests') }}
            </p>
          </div>
        </div>
        <div v-else>
          <p>
            {{ translate('pages.my-requests-overview.noRequests') }}
          </p>
        </div>
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

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import RequestFilter from '@assessment/components/RequestFilter/RequestFilter.vue'

import { useAssessmentStore } from '@shared/store/useAssessmentStore'

import type { FilterItem } from '@shared/types/table'

const assessmentStore = useAssessmentStore()
const url = useApiMyAssessmentRequestsUrl()

assessmentStore.fetchMyAssessments(url)

const { assessments, isFetching, error } = storeToRefs(assessmentStore)

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-requests-overview.title')}` })

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

// @TODO: get filters/counts from api
const filters = [
  { text: 'Hoge Prioriteit', id: 'priority', count: 6 },
  { text: 'Opgepakt', id: 'handled', count: 8 },
  { text: 'Aan mij toegekend', id: 'assigned_to_me', count: 12 },
  { text: 'Al mijn zaken', id: 'all', count: 25 }
]

function onFilterChange(item: FilterItem) {
  const { id } = item
  assessmentStore.filterAssessments(id)
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
</style>

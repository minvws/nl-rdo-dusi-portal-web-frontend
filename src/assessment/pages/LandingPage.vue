<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p>{{ translate('pages.home.subtitle') }}</p>
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
          <FilterTabs
            :items="filters"
            @change="onFilterChange"
          />
          <FilterOptions type="all-requests">
            <p>
              <span>{{ assessments?.length ?? 0 }}</span>
              {{ translate('pages.home.cases', {}, assessments?.length ?? 0) }}
            </p>
            <AppButton
              :data-show-filters-label="translate('pages.home.showFilters')"
              aria-expanded="false"
            >
              {{ translate('pages.home.showFilters') }}
            </AppButton>
          </FilterOptions>
          <div v-if="!assessments?.length">
            <p>
              {{ translate('pages.home.noRequests') }}
            </p>
          </div>
          <AppTable
            v-else
            :data="assessments"
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
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import {
  useApiAssessmentFilterCountUrl,
  useApiAssessmentRequestsUrl
} from '@shared/composables/useAssessmentApiUrl'
import { useAssessmentStore } from '@shared/store/useAssessmentStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import type { FilterItem } from '@shared/types/filters'

const assessmentStore = useAssessmentStore()
const filterUrl = useApiAssessmentFilterCountUrl()
const requestsUrl = useApiAssessmentRequestsUrl()

const { assessments, filters, isFetching, error } = storeToRefs(assessmentStore)

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.home.title')}` })

const headings = [
  { id: 'file', text: translate('pages.home.headings.file'), sortable: true },
  { id: 'arrangement', text: translate('pages.home.headings.arrangement'), sortable: true },
  { id: 'status', text: translate('pages.home.headings.status'), sortable: true },
  { id: 'deadline', text: translate('pages.home.headings.deadline'), sortable: true },
  { id: 'updated', text: translate('pages.home.headings.updated'), sortable: true },
  { id: 'reviewer', text: translate('pages.home.headings.reviewer'), sortable: true }
]

onBeforeMount(() => {
  assessmentStore.fetchAllAssessments(requestsUrl)
  assessmentStore.fetchFilters(filterUrl)
})

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

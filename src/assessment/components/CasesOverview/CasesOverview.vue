<template>
  <section>
    <AppIntro
      v-bind="{
        title: t('title'),
        body: t('subtitle')
      }"
    />
    <AppSuspense
      v-if="enabledFeature"
      v-bind="{ data: filters, error: filtersError, isFetching: isFetchingFilters }"
    >
      <FilterTabs
        :items="filters"
        :selected="params?.id"
        @change="onFilterChange"
      />
    </AppSuspense>
    <div v-if="enabledFeature">
      <FilterOptions
        :type="type"
        v-model="query"
      >
        <p v-if="query">
          <span>{{ numberOfCases }}</span>
          {{ t('cases', {}, numberOfCases) }}
        </p>
        <AppButton
          :data-show-filters-label="t('showFilters')"
          aria-expanded="false"
        >
          {{ t('showFilters') }}
        </AppButton>
      </FilterOptions>
    </div>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <AppTable
        :data="data"
        :columns="headings"
        :items-per-page="10"
      />
      <template #fallback>
        <p>{{ t('noCases') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { FilterItem } from '@shared/types/filters'
import type { Column } from '@shared/types/table'
import type { CaseType } from '@shared/types/cases'

import { computed } from 'vue'
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchCases } from '@assessment/composables/useFetchCases'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIntro from '@/@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import FilterTabs from '@assessment/components/FilterTabs/FilterTabs.vue'

const props = defineProps<{ type: CaseType }>()

const enabledFeature = import.meta.env.VITE_DISABLE_MVP_FEATURES === 'false'

const t = (key: string, values?: Record<string, string | number>, count?: number) =>
  translate(`pages.${props.type}-overview.${key}`, values, count)

useSEO({ title: `${t('title')} | ${translate('app.prefix')}` })

const { data, error, filters, filtersError, isFetching, isFetchingFilters, params, query } =
  useFetchCases(props)

const numberOfCases = computed(() => data.value.length ?? 0)

const hasItems = (key: string) => {
  return data.value?.find(({ [key]: value }) => value && !!Object.keys(value).length)
}
const headings = computed(() => {
  const items = [
    { id: 'case', sortable: false },
    { id: 'file', sortable: true },
    { id: 'arrangement', sortable: true },
    { id: 'stage-title', sortable: true },
    { id: 'status', sortable: true },
    { id: 'deadline', sortable: true },
    { id: 'updated', sortable: true },
    { id: 'reviewer', sortable: true },
    { id: 'action', sortable: true }
  ].filter(({ id }) => !!hasItems(id)) as Column[]

  return items.map(({ id, ...item }) => ({
    ...item,
    id,
    text: translate(`component.caseColum.${id}`)
  }))
})

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

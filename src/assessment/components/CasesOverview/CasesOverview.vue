<template>
  <section>
    <AppIntro
      v-bind="{
        title: t('title'),
        body: t('subtitle')
      }"
    />
    <div class="filter-options-container">
      <FilterOptions
        auto-close
        :type="type"
        v-model="query"
        :disabled="isFetching"
      >
        <span :class="{ transparent: !query || isFetching }">
          <strong>{{ numberOfCases }}</strong>
          <span class="count">&nbsp;{{ t('cases', {}, numberOfCases) }}&nbsp;</span>
          <small
            v-if="activeFilterCount"
            class="message"
          >
            {{ t('activeFilters', { count: activeFilterCount }, activeFilterCount) }}
          </small>
        </span>
        <AppButton
          :data-hide-filters-label="t('hideFilters')"
          aria-expanded="false"
        >
          {{ t('showFilters') }}
        </AppButton>
      </FilterOptions>
    </div>
    <AppSuspense
      v-bind="{
        data,
        error,
        isFetching: isFetching,
        loaderIsCentered: false
      }"
    >
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
import type { Column } from '@shared/types/table'
import type { CaseType } from '@shared/types/cases'

import { computed } from 'vue'
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchCases } from '@assessment/composables/useFetchCases'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'

import { hasItems } from '@shared/utils/app-table'

type Props = {
  type: CaseType
}

const props = defineProps<Props>()

const t = (key: string, values?: Record<string, string | number>, count?: number) =>
  translate(`pages.${props.type}-overview.${key}`, values, count)

useSEO({ title: `${t('title')} | ${translate('app.prefix')}` })

const { data, error, isFetching, query } = useFetchCases(props)

const numberOfCases = computed<number>(() => data.value.length ?? 0)

const activeFilterCount = computed<number>(() => {
  return Object.values(query.value ?? {}).filter(item => {
    if (!item) return item
    if (Array.isArray(item)) {
      return item.length
    }
    return !!item
  }).length
})

const headings = computed<Column[]>(() => {
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
  ].filter(({ id }) => !!hasItems(data.value, id)) as Column[]

  return items.map(({ id, ...item }) => ({
    ...item,
    id,
    text: translate(`component.caseColum.${id}`)
  }))
})
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}

.filter-options-container {
  min-height: 45px;
}

.transparent {
  opacity: 0;
}

.count,
.message {
  color: var(--grey-6);
}
</style>

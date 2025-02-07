<template>
  <section>
    <AppIntro
      :title="t(`pages.${type}-overview.title`)"
      :body="t(`pages.${type}-overview.subtitle`)"
    />
    <div class="filter-options-container">
      <FilterOptions
        auto-close
        :type="type"
        v-model="filterValues"
        :disabled="isFetching"
      >
        <span :class="{ transparent: !filterValues || isFetching }">
          <strong>{{ numberOfCases }}</strong>
          <span class="count"
            >&nbsp;{{ t(`pages.${type}-overview.cases`, {}, numberOfCases) }}&nbsp;</span
          >
          <small
            v-if="activeFilterCount"
            class="message"
          >
            {{
              t(
                `pages.${type}-overview.activeFilters`,
                { count: activeFilterCount },
                activeFilterCount
              )
            }}
          </small>
          <small
            v-if="sorting.id"
            class="message"
            >,
            {{ t(`pages.${type}-overview.sorting.label`) }}
            '{{ t(`pages.${type}-overview.sorting.options.${sorting.id}`) }}'
          </small>
        </span>
        <AppButton
          :data-hide-filters-label="t(`pages.${type}-overview.hideFilters`)"
          aria-expanded="false"
        >
          {{ t(`pages.${type}-overview.showFilters`) }}
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
      <CasesTable
        v-if="data.length && paginationMeta"
        :data="data"
        :pagination="paginationMeta"
        :sorting-id="sorting.id"
        :sorting-direction="sorting.direction"
        @page-change="onPageChange"
        @sorting-change="onSortingChange"
      />
      <template #fallback>
        <p>{{ t(`pages.${type}-overview.noCases`) }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { Case } from '@shared/types/cases'
import type { SortItem } from '@shared/types/sort'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchCases } from '@assessment/composables/useFetchCases'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import CasesTable from '@assessment/components/CasesTable/CasesTable.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'

type Props = {
  type: Case
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, paginationMeta, error, isFetching, query } = useFetchCases(props)

useSEO({ title: `${t(`pages.${props.type}-overview.title`)} | ${t('app.prefix')}` })

const numberOfCases = computed<number>(() => paginationMeta.value?.total ?? 0)

const filterValues = computed<Record<string, string | string[]> | undefined>({
  get: () => query.value,
  set: (value) => {
    query.value = { ...value, page: '1' }
  }
})

const sorting = computed<SortItem>(() => {
  const sort = (query.value?.sort as string) ?? ''

  const direction = sort.startsWith('-') ? 'descending' : 'ascending'
  const id = sort.replace(/^-/, '')

  return { id, direction }
})

const activeFilterCount = computed<number>(() => {
  return Object.entries(query.value ?? {}).filter(([key, item]) => {
    if (key === 'page' || key === 'sort') return false
    if (!item) return item
    if (Array.isArray(item)) {
      return item.length
    }
    return !!item
  }).length
})

function onPageChange(newPage: number) {
  query.value = { ...query.value, page: newPage.toString() }
}

function onSortingChange({ id, direction }: SortItem) {
  const sort = direction === 'ascending' ? id : `-${id}`
  query.value = { ...query.value, page: '1', sort: sort }
}
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

<template>
  <section>
    <div>
      <h1>{{ translate('pages.arrangements-overview.title') }}</h1>
      <p class="emphasized">{{ translate('pages.arrangements-overview.intro') }}</p>
    </div>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <SubsidySummary
        v-for="(item, index) in slicedItems"
        :key="index"
        v-bind="item"
      />
      <AppPagination
        :items-total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="onPageChange"
        with-buttons
      />
      <template #fallback>
        <p>{{ translate('pages.arrangements-overview.noSubsidies') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { toRefs } from 'vue'

import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useFetchSubsidies } from '@portal/composables/useFetchSubsidies'
import { usePagination } from '@shared/composables/usePagination'

import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import SubsidySummary from '@portal/components/SubsidySummary/SubsidySummary.vue'

import { ARRANGEMENT_OVERVIEW, ARRANGEMENT_OVERVIEW_PAGE } from '@shared/router/names'

type Props = {
  page?: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.arrangements-overview.title')}`
})

const { data, error, isFetching } = useFetchSubsidies()
const { currentPage, pageSize, slicedItems, total, onPageChange } = usePagination({
  ...toRefs(props),
  items: data as ComputedRef,
  routes: {
    overview: ARRANGEMENT_OVERVIEW,
    pagination: ARRANGEMENT_OVERVIEW_PAGE
  }
})
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}

.subsidy-summary {
  --card-border-width: 0;
  --card-breakpoint-1-padding-top: 0;
  --card-breakpoint-2-padding-top: 0;
  --card-breakpoint-1-padding-right: 0;
  --card-breakpoint-2-padding-right: 0;
  --card-breakpoint-1-padding-bottom: 0;
  --card-breakpoint-2-padding-bottom: 0;
  --card-breakpoint-1-padding-left: 0;
  --card-breakpoint-2-padding-left: 0;
}
</style>

<template>
  <section>
    <div>
      <h1>{{ translate('pages.arrangements-overview.title') }}</h1>
      <p class="emphasized">{{ translate('pages.arrangements-overview.intro') }}</p>
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
        <div v-else-if="!isFetching && data && data.length">
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
        </div>
        <div v-else>
          <p>
            {{ translate('pages.arrangements-overview.noSubsidies') }}
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
import type { ComputedRef } from 'vue'
import { toRefs } from 'vue'
import { useFetch } from '@vueuse/core'

import { translate } from '@shared/i18n'
import { ARRANGEMENT_OVERVIEW, ARRANGEMENT_OVERVIEW_PAGE } from '@shared/router/names'

import useSEO from '@shared/composables/useSeo'
import { useApiSubsidyUrl } from '@portal/composables/usePortalApiUrl'
import { usePagination } from '@shared/composables/usePagination'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import SubsidySummary from '@portal/components/SubsidySummary/SubsidySummary.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  page?: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.arrangements-overview.title')}`
})

const url = useApiSubsidyUrl()

const { data, error, isFetching } = useFetch(url).json()

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

<template>
  <section>
    <div>
      <h1>{{ translate('pages.arrangements-overview.title') }}</h1>
      <p class="emphasized">{{ translate('pages.arrangements-overview.intro') }}</p>
    </div>
    <AppLoader v-if="arrangements?.isLoading" centered />
    <p v-else-if="!arrangements?.isLoading && !arrangements?.data.length">
      {{ translate('pages.arrangements-overview.noSubsidies') }}
    </p>
    <div v-else>
      <SubsidySummary v-for="(item, index) in items" :key="index" v-bind="item" />
      <AppPagination
        :items-total="total"
        :page-size="pageSize"
        :start-page="currentPage"
        @page-change="onPageChange"
        with-buttons
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, toRefs } from 'vue'
import { translate } from '@/i18n'
import { useApiSubsidyUrl } from '@/composables/useApiUrl'
import { useDataStore } from '@/store/useDataStore'
import { usePagination } from '@/composables/usePagination'
import name from '@/router/name'

import useSEO from '@/composables/useSeo'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import SubsidySummary from '@/components/SubsidySummary/SubsidySummary.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'

const dataStore = useDataStore()
const props = defineProps<{ page?: string }>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.arrangements-overview.title')}`
})

onBeforeMount(() => {
  dataStore.fetchData(useApiSubsidyUrl(), 'currentArrangements')
})

const arrangements = computed(() => dataStore.getRequest('currentArrangements'))
const { currentPage, pageSize, items, total, onPageChange } = usePagination({
  ...toRefs(props),
  messages: arrangements,
  routes: {
    overview: name.ARRANGEMENT_OVERVIEW,
    pagination: name.ARRANGEMENT_OVERVIEW_PAGE
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

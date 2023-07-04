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
      <SubsidySummary v-for="(item, index) in arrangements.data" :key="index" v-bind="item" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { translate } from '@/i18n'
import { useApiSubsidyUrl } from '@/composables/useApiUrl'
import { useDataStore } from '@/store/useDataStore'
import useSEO from '@/composables/useSeo'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import SubsidySummary from '@/components/SubsidySummary/SubsidySummary.vue'

const dataStore = useDataStore()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.arrangements-overview.title')}`
})

onBeforeMount(() => {
  const url = useApiSubsidyUrl()
  dataStore.fetchData(url, 'currentArrangements')
})

const arrangements = computed(() => dataStore.getRequest('currentArrangements'))
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

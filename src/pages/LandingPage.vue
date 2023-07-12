<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p class="emphasized">{{ translate('pages.home.subtitle') }}</p>
      <p v-html="translate('pages.home.content.intro')" />
    </div>
  </section>
  <section class="background-color-offset">
    <div>
      <h2>{{ translate('pages.home.subsidiesTitle') }}</h2>
      <AppLoader v-if="arrangements?.isLoading" centered />
      <p v-else-if="!arrangements?.isLoading && !arrangements?.data.length">
        {{ translate('pages.home.noSubsidies') }}
      </p>
      <template v-else>
        <SubsidySummary v-for="(item, index) in arrangements.data" :key="index" v-bind="item" />
        <RouterLink :to="{ name: 'arrangements-overview' }" class="button">
          {{ translate('pages.home.subsidiesButton') }}
        </RouterLink>
      </template>
    </div>
  </section>
  <section>
    <div>
      <h2>{{ translate('pages.home.content.section1Title') }}</h2>
      <p v-html="translate('pages.home.content.section1Intro')" />
    </div>
  </section>
  <MoreInfo />
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { translate } from '@/i18n'

import { useDataStore } from '@/store/useDataStore'
import { useApiSubsidyUrl } from '@/composables/useApiUrl'
import useSEO from '@/composables/useSeo'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import MoreInfo from '@/components/MoreInfo/MoreInfo.vue'
import SubsidySummary from '@/components/SubsidySummary/SubsidySummary.vue'

const dataStore = useDataStore()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.home.title')}`
})

onBeforeMount(() => dataStore.fetchData(useApiSubsidyUrl(), 'arrangements'))

const arrangements = computed(() => dataStore.getRequest('arrangements'))
</script>

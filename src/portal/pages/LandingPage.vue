<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p class="emphasized">{{ translate('pages.home.subtitle') }}</p>
      <AppHtml
        as="p"
        :html="translate('pages.home.content.intro')"
      />
    </div>
  </section>
  <section class="background-color-offset">
    <AppSuspense v-bind="{ data: subsidies, error, isFetching }">
      <template #title>
        <h2>{{ translate('pages.home.subsidiesTitle') }}</h2>
      </template>
      <SubsidySummary
        v-for="(item, index) in subsidies"
        :key="index"
        v-bind="item"
      />
      <a
        v-bind="grantLink"
        class="button"
      >
        {{ translate('pages.home.subsidiesButton') }}
      </a>
      <template #fallback>
        <p>{{ translate('pages.home.noSubsidies') }}</p>
      </template>
    </AppSuspense>
  </section>
  <section>
    <div>
      <h2>{{ translate('pages.home.content.section1Title') }}</h2>
      <AppHtml
        as="p"
        :html="translate('pages.home.content.section1Intro')"
      />
    </div>
  </section>
  <MoreInfo />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useApiSubsidyUrl } from '@portal/composables/useApiUrl'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import MoreInfo from '@portal/components/MoreInfo/MoreInfo.vue'
import SubsidySummary, {
  type SubsidySummaryProps
} from '@portal/components/SubsidySummary/SubsidySummary.vue'

import { grantLink } from '@shared/external-links'

import { filterByValidTo } from '@/@shared/utils/filter'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.home.title')}`
})

const url = useApiSubsidyUrl()
const { data, error, isFetching } = useFetch(url).json()

const subsidies = computed(() =>
  data.value ? filterByValidTo<SubsidySummaryProps>(data.value) : []
)
</script>

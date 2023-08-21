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
    <div>
      <h2>{{ translate('pages.home.subsidiesTitle') }}</h2>
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
          <template v-else-if="!isFetching && subsidies && subsidies.length">
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
          </template>
          <p v-else>
            {{ translate('pages.home.noSubsidies') }}
          </p>
        </template>
        <template #fallback>
          <AppLoader centered />
        </template>
      </Suspense>
    </div>
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
import { useFetch } from '@vueuse/core'
import { translate } from '@shared/i18n'
import useSEO from '@shared/composables/useSeo'
import { useApiSubsidyUrl } from '@shared/composables/useApiUrl'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import MoreInfo from '@portal/components/MoreInfo/MoreInfo.vue'
import SubsidySummary, {
  type SubsidySummaryProps
} from '@portal/components/SubsidySummary/SubsidySummary.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { grantLink } from '@shared/external-links'
import { computed } from 'vue'

import { filterByValidTo } from '@/@shared/utils/filter'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.home.title')}`
})

const url = useApiSubsidyUrl()
const { data, error, isFetching } = useFetch(url).json()

const subsidies = computed(() => {
  if (!data.value) return undefined
  return filterByValidTo<SubsidySummaryProps>(data.value)
})
</script>

<template>
  <section>
    <div>
      <h1>{{ translate('pages.home.title') }}</h1>
      <p class="emphasized">{{ translate('pages.home.subtitle') }}</p>
      <AppHtml
        as="p"
        :html="introHtml"
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
          <div v-else-if="error">Error: {{ error }}</div>
          <template v-else-if="!isFetching && data && data.length">
            <SubsidySummary
              v-for="(item, index) in data"
              :key="index"
              v-bind="item"
            />
            <RouterLink
              v-bind="overviewRoute"
              class="button"
            >
              {{ translate('pages.home.subsidiesButton') }}
            </RouterLink>
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
import { translate } from '@/i18n'

import useSEO from '@/composables/useSeo'
import { useApiSubsidyUrl } from '@/composables/useApiUrl'
import { useAuthStore } from '@/store/useAuthStore'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import MoreInfo from '@/components/MoreInfo/MoreInfo.vue'
import SubsidySummary from '@/components/SubsidySummary/SubsidySummary.vue'
import AppHtml from '@/components/AppHtml/AppHtml.vue'
import { computed } from 'vue'
import { ARRANGEMENT_OVERVIEW, EXTERNAL } from '@/router/names'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.home.title')}`
})

const url = useApiSubsidyUrl()

const { data, error, isFetching } = useFetch(url).json()

const authStore = useAuthStore()

const overviewRoute = computed(() => {
  const name = authStore.isLoggedIn ? ARRANGEMENT_OVERVIEW : EXTERNAL
  return { to: { name }, rel: !authStore.isLoggedIn ? 'external' : undefined }
})

const introHtml = computed(() => {
  const id = authStore.isLoggedIn ? 'loggedIn' : 'default'
  return translate(`pages.home.content.intro.${id}`)
})
</script>

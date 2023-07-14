<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-file-overview.title') }}</h1>
      <p class="emphasized">
        {{ translate('pages.my-file-overview.intro') }}
      </p>
    </div>
    <div>
      <h2>{{ translate('pages.my-file-overview.section1Title') }}</h2>
      <Suspense>
        <template #default>
          <AppLoader v-if="isFetchingRequests" centered />
          <div v-else-if="requestsError">Error: {{ requestsError }}</div>
          <AppTable
            v-else-if="!isFetchingRequests && requests && requests.length"
            :caption="translate('pages.my-file-overview.tableCaption')"
            :headings="headings"
            :items="requests"
          />
          <p v-else>
            {{ translate('pages.my-file-overview.noRequests') }}
          </p>
        </template>
        <template #fallback>
          <AppLoader centered />
        </template>
      </Suspense>
    </div>
    <div>
      <h2>{{ translate('pages.my-file-overview.section2Title') }}</h2>
      <Suspense>
        <template #default>
          <AppLoader v-if="isFetchingMessages" centered />
          <div v-else-if="messagesError">Error: {{ messagesError }}</div>
          <template v-else-if="!isFetchingMessages && messages && messages.length">
            <MessageSummary v-for="(item, index) in messages" :key="index" v-bind="item" />
            <RouterLink :to="{ name: MY_MESSAGES }">
              {{ translate('pages.my-file-overview.allMessages') }}
            </RouterLink>
          </template>
          <p v-else>
            {{ translate('pages.my-file-overview.noMessages') }}
          </p>
        </template>
        <template #fallback>
          <AppLoader centered />
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'

import { translate } from '@/i18n'
import { MY_MESSAGES } from '@/router/names'

import useSEO from '@/composables/useSeo'
import { useApiMessagesUrl, useApiRequestsUrl } from '@/composables/useApiUrl'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import AppTable from '@/components/AppTable/AppTable.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'

const headings = [
  { text: 'Regeling' },
  { text: 'Datum indiening' },
  { text: 'Reactietermijn' },
  { text: 'Status' },
  { text: 'Actie benodigd' },
  { text: 'Open aanvraag' },
  { text: 'Details' }
]

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-file-overview.title')}`
})

const requestsUrl = useApiRequestsUrl()
const messagesUrl = useApiMessagesUrl()

const {
  data: requests,
  error: requestsError,
  isFetching: isFetchingRequests
} = useFetch(requestsUrl).json()

const {
  data: messages,
  error: messagesError,
  isFetching: isFetchingMessages
} = useFetch(messagesUrl).json()
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

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
          <AppLoader
            v-if="isFetchingRequests"
            centered
          />
          <div v-else-if="requestsError">
            <FormNotification
              display-as="error"
              :message="requestsError"
            />
          </div>
          <AppTable
            v-else-if="!isFetchingRequests && requests && requests.length"
            :caption="translate('pages.my-file-overview.table.caption')"
            :columns="headings"
            :data="requests"
            :items-per-page="10"
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
          <AppLoader
            v-if="isFetchingMessages"
            centered
          />
          <div v-else-if="messagesError">
            <FormNotification
              display-as="error"
              :message="messagesError"
            />
          </div>
          <template v-else-if="!isFetchingMessages && messages && messages.length">
            <MessageList :items="slicedMessages" />
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
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFetch } from '@vueuse/core'

import { translate } from '@shared/i18n'
import { MY_MESSAGES } from '@shared/router/names'

import useSEO from '@shared/composables/useSeo'
import { useApiMessagesUrl, useApiActiveRequestsUrl } from '@shared/composables/useApiUrl'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import MessageList from '@shared/components/MessageList/MessageList.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { useRequestsStore } from '@shared/store/useRequestsStore'

const actions = computed(() => {
  // @TODO: calculate the total amount of actions needed
  return 1
})

const headings = computed(() => {
  return [
    { id: 'arrangement', sortable: false },
    { id: 'created', sortable: false },
    { id: 'deadline', sortable: false },
    { id: 'status', sortable: false },
    { id: 'action', sortable: false }
  ].map(item => {
    const { id } = item
    return {
      ...item,
      text: translate(`pages.my-file-overview.table.${id}`, { actions: actions.value })
    }
  })
})

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-file-overview.title')}`
})

const activeRequestsUrl = useApiActiveRequestsUrl()
const requestsStore = useRequestsStore()
const messagesUrl = useApiMessagesUrl()

requestsStore.fetchAllRequests(activeRequestsUrl)

const {
  requests,
  error: requestsError,
  isFetching: isFetchingRequests
} = storeToRefs(requestsStore)

const {
  data: messages,
  error: messagesError,
  isFetching: isFetchingMessages
} = useFetch(messagesUrl).json()

const slicedMessages = computed(() => messages.value.slice(0, 5))
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

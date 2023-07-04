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
      <AppLoader v-if="requests?.isLoading" centered />
      <p v-else-if="!requests?.isLoading && !requests?.data.length">
        {{ translate('pages.my-file-overview.noRequests') }}
      </p>
      <AppTable
        v-else
        :caption="translate('pages.my-file-overview.tableCaption')"
        :headings="headings"
        :items="requests.data"
      />
    </div>
    <div>
      <h2>{{ translate('pages.my-file-overview.section2Title') }}</h2>
      <AppLoader v-if="messages?.isLoading" centered />
      <p v-else-if="!messages?.isLoading && !messages?.data.length">
        {{ translate('pages.my-file-overview.noMessages') }}
      </p>
      <template v-else>
        <MessageSummary
          v-for="(item, index) in recentMessages"
          :key="index"
          :description="item.description"
          :date="item.date"
          :link="item.link"
          :title="item.title"
        />
        <RouterLink :to="{ name: name.MY_MESSAGES }">
          {{ translate('pages.my-file-overview.allMessages') }}
        </RouterLink>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { translate } from '@/i18n'

import { useDataStore } from '@/store/useDataStore'
import useSEO from '@/composables/useSeo'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import AppTable from '@/components/AppTable/AppTable.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'
import { useApiMessagesUrl,  useApiRequestsUrl } from '@/composables/useApiUrl'

import name from '@/router/name'

const headings = [
  { text: 'Regeling' },
  { text: 'Datum indiening' },
  { text: 'Reactietermijn' },
  { text: 'Status' },
  { text: 'Actie benodigd' },
  { text: 'Open aanvraag' },
  { text: 'Details' }
]

const dataStore = useDataStore()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-file-overview.title')}`
})

onBeforeMount(() => {
  dataStore.fetchData(useApiMessagesUrl(), 'messages')
  dataStore.fetchData(useApiRequestsUrl(), 'requests')
})

const messages = computed(() => dataStore.getRequest('messages'))

const requests = computed(() => dataStore.getRequest('requests'))

const recentMessages = computed(() =>
  messages.value?.data.length ? messages.value.data.slice(0, 3) : []
)
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-messages-overview.title') }}</h1>
      <p v-html="translate('pages.my-messages-overview.intro')" />
    </div>
    <AppLoader v-if="messages?.isLoading" centered />
    <p v-else-if="!messages?.isLoading && !messages?.data.length">
      {{ translate('pages.my-messages-overview.noMessages') }}
    </p>
    <div v-else>
      <div class="filter" v-filters>
        <div>
          <p>
            <span>{{ total }}</span> berichten
          </p>
          <button data-show-filters-label="Toon filters" aria-expanded="false">
            Toon zoek en filter opties
          </button>
        </div>
        <form>
          <p>@TODO: filters</p>
        </form>
      </div>
      <MessageSummary
        v-for="(item, index) in items"
        :key="index"
        :description="item.description"
        :date="item.date"
        :link="item.link"
        :title="item.title"
      />
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

import { useDataStore } from '@/store/useDataStore'

import { useApiMessagesUrl } from '@/composables/useApiUrl'
import { usePagination } from '@/composables/usePagination'
import useSEO from '@/composables/useSeo'

import { translate } from '@/i18n'

import { MY_MESSAGES, MY_MESSAGES_PAGE } from '@/router/names'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'

import vFilters from '@/directives/filters'

const props = defineProps<{ page?: string }>()

const dataStore = useDataStore()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-messages-overview.title')}`
})

onBeforeMount(() => {
  dataStore.fetchData(useApiMessagesUrl(), 'messages')
})

const messages = computed(() => dataStore.getRequest('messages'))
const { currentPage, pageSize, items, total, onPageChange } = usePagination({
  ...toRefs(props),
  messages,
  routes: {
    overview: MY_MESSAGES,
    pagination: MY_MESSAGES_PAGE
  }
})
</script>

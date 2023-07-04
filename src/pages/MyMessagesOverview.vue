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
            <span>{{ messagesTotal }}</span> berichten
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
        v-for="(item, index) in paginatedMessages"
        :key="index"
        :description="item.description"
        :date="item.date"
        :link="item.link"
        :title="item.title"
      />
      <AppPagination
        :items-total="messagesTotal"
        :page-size="pageSize"
        :start-page="currentPage"
        @page-change="onPageChange"
        with-buttons
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { useRouter } from 'vue-router'
import useSEO from '@/composables/useSeo'
import { translate } from '@/i18n'

import name from '@/router/name'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'

import vFilters from '@/directives/filters'
import { useApiMessagesUrl } from '@/composables/useApiUrl'


const props = defineProps<{ page?: string }>()
const dataStore = useDataStore()
const router = useRouter()


useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-messages-overview.title')}`
})

onBeforeMount(() => {
  dataStore.fetchData(useApiMessagesUrl(), 'messages')
})

const currentPage = computed(() => {
  return props.page ? parseInt(props.page) : 1
})

const pageSize = ref(5)

const messages = computed(() => dataStore.getRequest('messages'))

const messagesTotal = computed(() => messages.value?.data.length)

const paginatedMessages = computed(() =>
  messages.value?.data.length
    ? messages.value?.data.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value
      )
    : []
)

const onPageChange = (page: number) => {
  if (page > 1) router.push({ name: name.MY_MESSAGES_PAGE, params: { page }})
  else router.push({ name: name.MY_MESSAGES })
}
</script>

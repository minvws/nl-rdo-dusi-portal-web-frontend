<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-messages-overview.title') }}</h1>
      <AppHtml
        as="p"
        :html="translate('pages.my-messages-overview.intro')"
      />
    </div>
    <div>
      <FilterOptions
        type="messages"
        v-model="query"
      >
        <p>
          <span>{{ total }}</span>
          {{ translate('component.messagesOverview.messages', { total }, total) }}
        </p>
        <AppButton aria-expanded="false">
          {{ translate('component.messagesOverview.filter') }}
        </AppButton>
      </FilterOptions>
    </div>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <MessageList :items="slicedItems" />
      <AppPagination
        :items-total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="onPageChange"
        with-buttons
      />
      <template #fallback>
        <p>{{ translate('pages.my-messages-overview.noMessages') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { toRefs } from 'vue'

import { translate } from '@shared/i18n'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiMessagesUrl } from '@portal/composables/useApiUrl'
import { usePagination } from '@shared/composables/usePagination'
import useSEO from '@shared/composables/useSeo'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import MessageList from '@shared/components/MessageList/MessageList.vue'

import { MY_MESSAGES, MY_MESSAGES_PAGE } from '@shared/router/names'

type Props = {
  page?: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-messages-overview.title')}`
})

const url = useApiMessagesUrl()
const { data, error, query, isFetching } = useQueryFetch(url)
const { currentPage, pageSize, slicedItems, total, onPageChange } = usePagination({
  ...toRefs(props),
  items: data as ComputedRef,
  routes: {
    overview: MY_MESSAGES,
    pagination: MY_MESSAGES_PAGE
  }
})
</script>

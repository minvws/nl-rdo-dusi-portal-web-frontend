<template>
  <section>
    <div>
      <h1>{{ t('pages.my-messages-overview.title') }}</h1>
      <AppHtml
        as="p"
        :html="t('pages.my-messages-overview.intro')"
      />
    </div>
    <div>
      <FilterOptions
        type="messages"
        v-model="query"
        v-if="!isFilterDisabled"
      >
        <p v-if="query">
          <span>{{ total }}</span>
          {{ t('component.messagesOverview.messages', { total }, total) }}
        </p>
        <AppButton
          :data-hide-filters-label="t('component.messagesOverview.hideFilters')"
          aria-expanded="false"
        >
          {{ t('component.messagesOverview.showFilters') }}
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
        <p v-if="query || isFilterDisabled">
          {{ t('pages.my-messages-overview.noMessages') }}
        </p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchMessages } from '@portal/composables/useFetchMessages'
import { usePagination } from '@shared/composables/usePagination'
import { useSEO } from '@shared/composables/useSeo'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppPagination from '@shared/components/AppPagination/AppPagination.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FilterOptions from '@shared/components/FilterOptions/FilterOptions.vue'
import MessageList from '@shared/components/MessageList/MessageList.vue'

import { MY_MESSAGES_OVERVIEW, MY_MESSAGES_PAGE } from '@portal/router/names'

type Props = {
  page?: string
}

const props = defineProps<Props>()

const isFilterDisabled = import.meta.env.VITE_MESSAGES_FILTER_ENABLED === 'false'

const { t } = useI18n()
const { data, error, query, isFetching } = useFetchMessages(isFilterDisabled)
const { currentPage, pageSize, slicedItems, total, onPageChange } = usePagination({
  ...toRefs(props),
  items: data as ComputedRef,
  isFetching,
  routes: {
    overview: MY_MESSAGES_OVERVIEW,
    pagination: MY_MESSAGES_PAGE
  }
})

useSEO({
  title: `${t('pages.my-messages-overview.title')} | ${t('app.prefix')}`
})
</script>

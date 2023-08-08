<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-messages-overview.title') }}</h1>
      <AppHtml
        as="p"
        :html="translate('pages.my-messages-overview.intro')"
      />
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="!isFetching && data && data.length">
          <div
            class="filter"
            v-filters
          >
            <div>
              <p>
                <span>{{ total }}</span> {{ $t('component.messagesOverview.messages', total) }}
              </p>
              <button aria-expanded="false">
                {{ $t('component.messagesOverview.filter') }}
              </button>
            </div>
            <form>
              <p>@TODO: filters</p>
            </form>
          </div>
          <MessageSummary
            v-for="(item, index) in slicedItems"
            :key="index"
            v-bind="item"
          />
          <AppPagination
            :items-total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            @page-change="onPageChange"
            with-buttons
          />
        </div>
        <p v-else>
          {{ translate('pages.my-messages-overview.noMessages') }}
        </p>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { toRefs } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiMessagesUrl } from '@/composables/useApiUrl'
import { usePagination } from '@/composables/usePagination'
import useSEO from '@/composables/useSeo'

import { translate } from '@/i18n'

import { MY_MESSAGES, MY_MESSAGES_PAGE } from '@/router/names'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'
import AppHtml from '@/components/AppHtml/AppHtml.vue'

import vFilters from '@/directives/filters'

type Props = {
  page?: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-messages-overview.title')}`
})

const url = useApiMessagesUrl()

const { data, error, isFetching } = useFetch(url).json()

const { currentPage, pageSize, slicedItems, total, onPageChange } = usePagination({
  ...toRefs(props),
  items: data as ComputedRef,
  routes: {
    overview: MY_MESSAGES,
    pagination: MY_MESSAGES_PAGE
  }
})
</script>

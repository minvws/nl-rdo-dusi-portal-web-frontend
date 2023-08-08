<template>
  <section>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetchingDetails"
          centered
        />
        <div v-else-if="detailsError">Error: {{ detailsError }}</div>
        <div v-else-if="!isFetchingDetails && details">
          <h1>{{ details.title }}</h1>
          <p class="emphasized">{{ details.intro }}</p>
          <p>{{ details.body }}</p>
        </div>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
    <div class="two-thirds-one-third">
      <div>
        <h3>{{ translate('pages.my-request-details.status') }}</h3>
        <Suspense>
          <template #default>
            <AppLoader
              v-if="isFetchingDetails"
              centered
            />
            <div v-else-if="detailsError">Error: {{ detailsError }}</div>
            <div v-else-if="!isFetchingDetails && details">
              <p>{{ details.statusIntro }}</p>
              <RequestSteps
                v-if="details.steps"
                :items="details.steps"
                @cancel="onCancel"
                @download="onDownload"
                @edit="onEdit"
              />
            </div>
          </template>
          <template #fallback>
            <AppLoader centered />
          </template>
        </Suspense>
      </div>

      <div>
        <h3>{{ translate('pages.my-request-details.messages') }}</h3>
        <Suspense>
          <template #default>
            <AppLoader
              v-if="isFetchingMessages"
              centered
            />
            <div v-else-if="messagesError">Error: {{ messagesError }}</div>
            <div v-else-if="!isFetchingMessages && messages && messages.length">
              <MessageSummary
                v-for="(item, index) in messages"
                :key="index"
                v-bind="item"
              />
            </div>
            <p v-else>
              {{ translate('pages.my-request-details.noMessages') }}
            </p>
          </template>
          <template #fallback>
            <AppLoader centered />
          </template>
        </Suspense>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { translate } from '@/shared/i18n'

import { useApiMessagesUrl, useApiRequestDetail } from '@/shared/composables/useApiUrl'
import useSEO from '@/shared/composables/useSeo'

import AppLoader from '@/shared/components/AppLoader/AppLoader.vue'
import MessageSummary from '@/shared/components/MessageSummary/MessageSummary.vue'
import RequestSteps from '@/shared/components/RequestSteps/RequestSteps.vue'
import { log } from '@/shared/util/logger-util'

const route = useRoute()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-details.title')}`
})

const { id } = route.params as { id: string }

const messagesUrl = useApiMessagesUrl()
const detailsUrl = useApiRequestDetail(id)

const {
  data: messages,
  error: messagesError,
  isFetching: isFetchingMessages
} = useFetch(messagesUrl).json()
const {
  data: details,
  error: detailsError,
  isFetching: isFetchingDetails
} = useFetch(detailsUrl).json()

function onDownload(event: Event) {
  log('download', event)
}

function onEdit(event: Event) {
  log('edit', event)
}

function onCancel(event: Event) {
  log('cancel', event)
}
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}

.two-thirds-one-third {
  --layout-two-thirds-one-third-gap: 3rem;
  --layout-two-thirds-one-third-breakpoint-gap: var(--layout-two-thirds-one-third-gap);
}

.two-thirds-one-third > * {
  gap: 3rem;
}

.accordion {
  gap: 3rem;
}
</style>

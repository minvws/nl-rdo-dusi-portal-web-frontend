<template>
  <section>
    <div>
      <h1>{{ details.title }}</h1>
      <p class="emphasized">{{ details.intro }}</p>
      <p>{{ details.body }}</p>
    </div>

    <div class="two-thirds-one-third">
      <div>
        <h3>{{ translate('pages.my-request-details.status') }}</h3>
        <AppSuspense v-bind="{ data: details, error: detailsError, isFetching: isFetchingDetails }">
          <p>{{ details.statusIntro }}</p>
          <RequestSteps
            v-if="details.steps"
            :items="details.steps"
            @cancel="onCancel"
            @download="onDownload"
            @edit="onEdit"
          />
        </AppSuspense>
      </div>

      <div>
        <h3>{{ translate('pages.my-request-details.messages') }}</h3>
        <AppSuspense
          v-bind="{ data: messages, error: messagesError, isFetching: isFetchingMessages }"
        >
          <MessageSummary
            v-for="(item, index) in messages"
            :key="index"
            v-bind="item"
          />
          <template #fallback>
            <p>{{ translate('pages.my-request-details.noMessages') }}</p>
          </template>
        </AppSuspense>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchMessages } from '@portal/composables/useFetchMessages'
import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import useSEO from '@shared/composables/useSeo'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import MessageSummary from '@portal/components/MessageSummary/MessageSummary.vue'
import RequestSteps from '@portal/components/RequestSteps/RequestSteps.vue'

import { log } from '@shared/utils/logger'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-details.title')}`
})

const { data: messages, error: messagesError, isFetching: isFetchingMessages } = useFetchMessages()
const {
  data: details,
  error: detailsError,
  isFetching: isFetchingDetails
} = useFetchRequestDetails(props.id)

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
</style>

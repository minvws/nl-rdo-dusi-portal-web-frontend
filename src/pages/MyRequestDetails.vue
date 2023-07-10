<template>
  <section>
    <div>
      <h1>{{ content?.title }}</h1>
      <p class="emphasized">{{ content?.intro }}</p>
      <p>{{ content?.body }}</p>
    </div>
    <div class="two-thirds-one-third">
      <div>
        <h3>{{ translate('pages.my-request-details.status') }}</h3>
        <p>{{ content?.statusIntro }}</p>
        <AppAccordion v-if="content?.steps">
          <AppAccordionItem
            v-for="(step, index) in content.steps"
            :id="step.title"
            :key="index"
            is-open
          >
            <template #title>{{ step.title }}</template>
            <template #content>
              <div v-html="step.content" />
              <div class="horizontal-view">
                <AppButton v-if="step.actions.download" class="ghost" @click="onDownload">
                  <AppIcon name="download" aria-hidden="true" />
                  {{ translate('pages.my-request-details.downloadLabel') }}
                </AppButton>
                <AppButton v-if="step.actions.edit" class="ghost" @click="onEdit">
                  <AppIcon name="chevron-light-right" aria-hidden="true" />
                  {{ translate('pages.my-request-details.editLabel') }}
                </AppButton>
                <AppButton v-if="step.actions.cancel" class="ghost" @click="onCancel">
                  <AppIcon name="chevron-light-right" aria-hidden="true" />
                  {{ translate('pages.my-request-details.cancelLabel') }}
                </AppButton>
                <p v-if="!step.actions.download && !step.actions.edit && !step.actions.cancel">
                  <strong>{{ translate('pages.my-request-details.noAction') }}</strong>
                </p>
              </div>
            </template>
          </AppAccordionItem>
        </AppAccordion>
      </div>

      <div>
        <h3>{{ translate('pages.my-request-details.messages') }}</h3>
        <AppLoader v-if="messages?.isLoading" centered />
        <p v-else-if="!messages?.isLoading && !messages?.data.length">
          {{ translate('pages.my-request-details.noMessages') }}
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
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { translate } from '@/i18n'

import { useDataStore } from '@/store/useDataStore'
import { useApiMessagesUrl, useApiRequestDetail } from '@/composables/useApiUrl'
import useSEO from '@/composables/useSeo'

import AppAccordion from '@/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@/components/AppAccordionItem/AppAccordionItem.vue'
import AppButton from '@/components/AppButton/AppButton.vue'
import AppIcon from '@/components/AppIcon/AppIcon.vue'
import AppLoader from '@/components/AppLoader/AppLoader.vue'
import MessageSummary from '@/components/MessageSummary/MessageSummary.vue'

const route = useRoute()
const dataStore = useDataStore()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-details.title')}`
})

onBeforeMount(() => {
  const { id } = route.params as { id: string }
  dataStore.fetchData(useApiRequestDetail(id), id)
  dataStore.fetchData(useApiMessagesUrl(), 'messages')
})

const messages = computed(() => dataStore.getRequest('messages'))

const content = computed(() => {
  const { id } = route.params as { id: string }
  return dataStore.getRequest(id)?.data
})

const recentMessages = computed(() =>
  messages.value?.data.length ? messages.value.data.slice(0, 3) : []
)

function onDownload(event: Event) {
  console.log('download', event)
}

function onEdit(event: Event) {
  console.log('edit', event)
}

function onCancel(event: Event) {
  console.log('cancel', event)
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

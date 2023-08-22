<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-request.title') }}</h1>
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <div v-else-if="error">
          <FormNotification
            display-as="error"
            :message="error"
          />
        </div>
        <template v-else-if="!isFetching && request">
          <div>
            <AppAccordion>
              <AppAccordionItem id="request">
                <template #title>{{ translate('pages.review-request.request') }}</template>
                <template #content>
                  <RequestDetails :items="items" />
                </template>
              </AppAccordionItem>
            </AppAccordion>
          </div>
          <div v-if="reviewForm">
            <FormView
              id="review-request"
              :forms="reviews"
              :hide-debug="true"
              @submit="onSubmit"
            />
          </div>
        </template>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { translate } from '@shared/i18n'

import { useFetchAssessment } from '@assessment/composables/useFetchAssessment'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

import { formatDetailsData } from '@shared/utils/format'

import type { FormData } from '@shared/types/form'

const route = useRoute()

const { id } = route.params

const { data, error, isFetching } = useFetchAssessment(id as string)

const request = computed(
  () => data.value?.stages?.find((stage: any) => stage.metadata.title === 'Aanvraag')
)

const items = computed(() => formatDetailsData(request.value))

const reviews = computed(
  () => data.value?.stages?.filter((stage: any) => stage.metadata.title === 'Beoordeling')
)

const reviewForm = computed(
  () =>
    data.value?.stages?.filter(
      (stage: any) => stage.metadata.title === 'Beoordeling' && stage.metadata.uiType === 'INPUT'
    )
)

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>

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
        <template v-else-if="!isFetching && assessment">
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
              id="987vet789ve9n78x"
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
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAssessmentStore } from '@shared/store/useAssessmentStore'

import { transformDetailsData } from '@shared/utils/format'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

import type { FormData } from '@shared/types/form'

const assessmentStore = useAssessmentStore()
const route = useRoute()

const { id } = route.params
const { assessment, request, reviews, reviewForm, isFetching, error } = storeToRefs(assessmentStore)

onBeforeMount(() => assessmentStore.fetchAssessment(id as string))

const items = computed(() => transformDetailsData(request.value))

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>

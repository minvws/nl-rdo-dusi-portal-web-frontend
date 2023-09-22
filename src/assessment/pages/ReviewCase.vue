<template>
  <section>
    <div v-if="caseData?.currentApplicationStage">
      <h1>{{ caseData.currentApplicationStage.metadata.subsidyStage.title }}</h1>
    </div>
    <AppSuspense
      v-bind="{ data: caseData, error: caseError, isFetching: isFetchingCase }"
      v-if="caseData"
    >
      <AppAccordion v-if="caseData">
        <AppAccordionItem id="case">
          <template #title>{{
            caseData.applicantApplicationStage.metadata.subsidyStage.title
          }}</template>
          <template #content>
            <FormView
              id="review-application-metadata"
              :forms="[caseData.application]"
              :values="caseData.application.data"
              :hide-debug="true"
              :no-buttons="true"
            />
            <FormView
              id="review-stage-1"
              :forms="[caseData.applicantApplicationStage]"
              :values="caseData.applicantApplicationStage.data"
              :hide-debug="true"
              :no-buttons="true"
            />
          </template>
        </AppAccordionItem>
        <AppAccordionItem
          v-for="(stage, index) in caseData.otherApplicationStages"
          :key="`stage-${index}`"
          id="stage.metadata.applicationStage.id"
        >
          <template #title>{{ stage.metadata.subsidyStage.title }}</template>
          <template #content>
            <FormView
              id="review-stage-{{ stage.metadata.subsidyStage.stage }}"
              :forms="[stage]"
              :values="stage.data"
              :hide-debug="true"
              :no-buttons="!stage.metadata.applicationStage.isCurrent"
            />
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'
import useSEO from '@shared/composables/useSeo'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.review-case.title', {}, 3)}` })

const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase
} = useFetchCase(props.id as string)
</script>

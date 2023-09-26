<template>
  <section>
    <div v-if="caseTitle">
      <h1>{{ caseTitle }}</h1>
    </div>
    <AppSuspense
      v-bind="{
        data: caseData,
        error: caseError,
        isFetching: isFetchingCase
      }"
    >
      <AppAccordion v-if="caseData">
        <AppAccordionItem id="case">
          <template #title>{{ caseDetail?.title }}</template>
          <template #content>
            <pre>{{ caseDetail?.forms.length }}</pre>
            <FormView
              v-bind="{
                id: 'review-application-metadata',
                ...caseDetail,
                ...formViewOptions
              }"
            />
            <FormView
              v-if="caseStage"
              v-bind="{
                id: 'review-stage-item',
                ...caseStage,
                ...formViewOptions
              }"
            />
          </template>
        </AppAccordionItem>
        <template v-if="otherCases">
          <AppAccordionItem
            v-for="(stage, index) in otherCases"
            :key="`stage-${index}`"
            :id="`stage-${index}`"
            :is-open="true"
          >
            <template #title>{{ stage.title }}</template>
            <template #content>
              <FormView
                :id="`review-stage-item-${index}}`"
                v-bind="{
                  ...stage,
                  ...(index < otherCases.length - 1 ? formViewOptions : formEditOptions)
                }"
              />
            </template>
          </AppAccordionItem>
        </template>
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

const formViewOptions = {
  hideDebug: true,
  noStyle: true,
  noButtons: true
}

const formEditOptions = {
  hideDebug: true,
  noStyle: true
}

const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase,
  caseDetail,
  caseStage,
  otherCases,
  caseTitle
} = useFetchCase(props.id as string)
</script>

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
                id: `${props.id}/stages/${caseStageId}`,
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
            :is-open="index === otherCases.length - 1"
          >
            <template #title>{{ stage.title }}</template>
            <template #content>
              <FormView
                :id="`review-stage-item-${index}}`"
                v-bind="{
                  ...stage,
                  ...(index < otherCases.length - 1 ? formViewOptions : formEditOptions)
                }"
                @submit="onSubmit"
                @save="onSave"
              />
            </template>
          </AppAccordionItem>
        </template>
      </AppAccordion>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'
import { computed, watch } from 'vue'

import { translate } from '@shared/i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'
import { useSubmitCase } from '@assessment/composables/useSubmitCase'
import { useSEO } from '@shared/composables/useSeo'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { onSubmitForm, onSubmitDraft, locked } = useSubmitCase()

const formViewOptions = computed(() => ({
  hideDebug: true,
  noStyle: true,
  noButtons: true,
  locked: locked.value,
  title: undefined,
  hideRequiredLabel: true
}))

const formEditOptions = computed(() => ({
  hideDebug: true,
  noStyle: true,
  locked: locked.value,
  hasSaveButton: true,
  title: undefined,
  hideRequiredLabel: true
}))

const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase,
  caseDetail,
  caseReference,
  caseStage,
  caseStageId,
  caseTitle,
  otherCases
} = useFetchCase(props.id as string)

const onSubmit = (data: FormData) => {
  const { id } = props
  onSubmitForm({ id, data })
}

const onSave = (data: FormData) => {
  const { id } = props
  onSubmitDraft({ id, data })
}

watch(caseReference, (reference) => {
  if (reference) {
    const title = `${reference} - ${translate('pages.review-case.title')}`
    useSEO({ title: `${title} | ${translate('app.prefix')}` })
  }
})
</script>

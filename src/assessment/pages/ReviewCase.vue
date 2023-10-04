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
                @preview="onPreview"
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
import { useRouter } from 'vue-router'
import { PREVIEW_CASE_SUBMIT } from '../router/names'

type Props = {
  id: string
}

const props = defineProps<Props>()

const router = useRouter()

useSEO({ title: `${translate('pages.review-case.title')} | ${translate('app.prefix')}` })

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
  hasPreviewButton: true,
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

function onSubmit(data: FormData) {
  const { id } = props
  onSubmitForm({ id, data })
}

function onSave(data: FormData) {
  const { id } = props
  onSubmitDraft({ id, data })
}

async function onPreview(data: FormData) {
  const { id } = props
  await onSubmitDraft({ id, data })
  router.replace({ name: PREVIEW_CASE_SUBMIT, params: { id } })
}
watch(
  caseReference,
  reference => {
    if (!reference) return

    const title = `${reference} - ${translate('pages.review-case.title')} | ${translate(
      'app.prefix'
    )}`

    window.document.title = title
  },
  { immediate: true }
)
</script>

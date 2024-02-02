<template>
  <section>
    <div v-if="caseTitle">
      <h1>{{ caseTitle }}</h1>
    </div>
    <AppSuspense
      v-bind="{
        data: caseData,
        error: caseError,
        isFetching: isFetchingCase || isFetchingTransitionHistory
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
          >
            <template #title>{{ stage.title }}</template>
            <template #content>
              <FormView
                :id="`review-stage-item-${index}}`"
                v-bind="{
                  ...formViewOptions,
                  ...stage,
                  title: undefined
                }"
              />
            </template>
          </AppAccordionItem>
        </template>
      </AppAccordion>
      <FormView
        v-if="lastCase"
        :id="`review-stage-item-`"
        v-bind="{
          ...formEditOptions,
          ...lastCase,
          title: undefined
        }"
        @submit="onSubmit"
        @save="onSave"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import type { FormData } from '@shared/types/form'

import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'
import { useSubmitCase } from '@assessment/composables/useSubmitCase'
import { useSEO } from '@shared/composables/useSeo'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

import { PREVIEW_CASE_SUBMIT } from '@assessment/router/names'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()
const { onSubmitDraft, locked } = useSubmitCase()

useSEO({ title: `${t('pages.review-case.title')} | ${t('app.prefix')}` })

const formViewOptions = computed<Record<string, boolean | undefined>>(() => ({
  hideDebug: true,
  noStyle: true,
  noButtons: true,
  locked: locked.value,
  title: undefined,
  hideRequiredLabel: true
}))

const formEditOptions = computed<Record<string, boolean | undefined>>(() => ({
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
  isFetchingTransitionHistory,
  caseDetail,
  caseReference,
  caseStage,
  caseStageId,
  caseTitle,
  otherCases,
  lastCase
} = useFetchCase(props.id as string)

async function onSubmit(data: FormData) {
  const { id } = props
  await onSubmitDraft({ id, data })
  router.replace({ name: PREVIEW_CASE_SUBMIT, params: { id } })
}

function onSave(data: FormData) {
  const { id } = props
  onSubmitDraft({ id, data })
}

watch(
  caseReference,
  reference => {
    if (!reference) return

    const title = `${reference} - ${t('pages.review-case.title')} | ${t('app.prefix')}`

    window.document.title = title
  },
  { immediate: true }
)
</script>

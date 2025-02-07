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
              v-bind="{ ...caseDetail }"
              hide-debug
              hide-required-label
              id="review-application-metadata"
              :locked="locked"
              no-buttons
              no-style
            />
            <FormView
              v-if="caseStage"
              v-bind="{ ...caseStage }"
              hide-debug
              hide-required-label
              :id="stageFormId"
              :locked="locked"
              no-buttons
              no-style
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
                v-bind="{ ...stage }"
                hide-debug
                hide-required-label
                :id="`review-stage-item-${index}`"
                :locked="locked"
                no-buttons
                no-style
              />
            </template>
          </AppAccordionItem>
        </template>
      </AppAccordion>
      <FormView
        v-if="lastCase"
        v-bind="{ ...lastCase }"
        has-save-button
        hide-debug
        hide-required-label
        :id="lastCaseFormId"
        :locked="locked"
        no-style
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

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()
const { onSubmitDraft, onSubmitForm, locked } = useSubmitCase()

const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase,
  isFetchingTransitionHistory,
  caseDetail,
  caseReference,
  caseStage,
  caseTitle,
  otherCases,
  lastCase
} = useFetchCase(props.id)
useSEO({ title: `${t('pages.review-case.title')} | ${t('app.prefix')}` })

async function onSubmit(data: FormData): Promise<void> {
  const { id } = props
  await onSubmitForm({ id, data })
}

function onSave(data: FormData): void {
  const { id } = props
  onSubmitDraft({ id, data })
}

const stageFormId = computed<string>(() => props.id)

const lastCaseFormId = computed<string>(() =>
  JSON.stringify(lastCase.value) === JSON.stringify(caseStage.value)
    ? stageFormId.value
    : `review-stage-form`
)

watch(
  caseReference,
  (reference) => {
    if (!reference) return

    const title = `${reference} - ${t('pages.review-case.title')} | ${t('app.prefix')}`

    window.document.title = title
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
:deep(.form-results-table) {
  --description-list-item-gap: var(--form-group-gap);

  dl > div {
    > dt {
      flex: 0.25;
    }
    > dd {
      flex: 0.75;
    }
  }
}
</style>

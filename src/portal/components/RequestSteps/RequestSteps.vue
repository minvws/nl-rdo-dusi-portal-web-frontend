<template>
  <AppAccordion>
    <AppAccordionItem
      id="step-1"
      :initially-open="step === 1"
      :is-highlighted="step === 1"
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 1 }) }} </strong>
        {{ t('component.requestSteps.request') }}
      </template>
      <template #content>
        <AppHtml
          as="p"
          :html="t('component.requestSteps.submitDate', { date: submitDate })"
        />
        <AppHtml
          as="p"
          :html="t('component.requestSteps.additionalInfo')"
        />
        <AppHtml
          as="p"
          :html="t('component.requestSteps.info')"
        />
        <RouterLink
          class="ghost"
          :to="pdfLink"
        >
          <AppIcon name="pdf-file" />
          {{ t('component.requestSteps.request') }}
        </RouterLink>
        <p>
          <strong>{{ t('component.requestSteps.customerSatisfaction') }}</strong>
        </p>
        <AppHtml
          as="p"
          :html="t('component.requestSteps.customerSatisfactionLink', { customerSatisfactionRel, customerSatisfactionHref, referenceCode, additionalArguments: '|burgerportaal:ja' })"
        />
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-2"
      :initially-open="step === 2"
      :is-highlighted="step === 2"
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 2 }) }} </strong>
        {{ t('component.requestSteps.order') }}
      </template>
      <template #content>
        <AppHtml
          as="p"
          :html="t(`component.requestSteps.step_2.${status}`, { date: respondDate })"
        />
        <AppHtml
          as="p"
          :html="t('component.requestSteps.noAction')"
        />
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-3"
      :initially-open="step === 3"
      :is-highlighted="step === 3"
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 3 }) }} </strong>
        {{ t('component.requestSteps.payout') }}
      </template>
      <template #content>
        <AppHtml
          as="p"
          :html="t(`component.requestSteps.step_3.${status}`)"
        />
        <AppHtml
          as="p"
          :html="t('component.requestSteps.noAction')"
        />
      </template>
    </AppAccordionItem>
  </AppAccordion>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { externalUrls } from '@shared/external-links'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { MY_REQUEST_DETAILS } from '@portal/router/names'

import { formatAsReadableDate } from '@shared/utils/date'

type Props = {
  finalReviewDeadline: string
  reference: string
  step: number
  status: string
  submittedAt: string
}

const props = defineProps<Props>()

const { locale, t } = useI18n()

const pdfLink = computed<RouteLocationRaw>(() => ({
  name: MY_REQUEST_DETAILS,
  params: { reference: props.reference }
}))

const referenceCode = computed<string>(() => props?.reference?.split('-')?.[0])

const respondDate = computed<string>(() => formatAsReadableDate(props.finalReviewDeadline, locale.value))

const submitDate = computed<string>(() => formatAsReadableDate(props.submittedAt, locale.value))

const customerSatisfactionHref = externalUrls.customerSatisfaction.href
const customerSatisfactionRel = externalUrls.customerSatisfaction.rel
</script>

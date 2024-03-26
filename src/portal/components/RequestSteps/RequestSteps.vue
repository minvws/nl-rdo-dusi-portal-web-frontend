<template>
  <AppAccordion>
    <AppAccordionItem
      id="step-1"
      initially-open
      is-highlighted
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 1 }) }} </strong>
        {{ t('component.requestSteps.request') }}
      </template>
      <template #content>
        <p>{{ t('component.requestSteps.submitDate', { date: submitDate }) }}</p>
        <p>{{ t('component.requestSteps.additionalInfo') }}</p>
        <p>
          <strong>{{ t('component.requestSteps.info') }}</strong>
        </p>
        <RouterLink
          class="ghost"
          :to="{
            name: MY_REQUEST_DETAILS,
            params: { reference }
          }"
        >
          <AppIcon name="pdf-file" />
          {{ t('component.requestSteps.request') }}
        </RouterLink>
        <p>
          <strong>{{ t('component.requestSteps.customerSatisfaction') }}</strong>
        </p>
        <AppHtml
          as="p"
          :html="t('component.requestSteps.customerSatisfactionLink', { referenceCode })"
        />
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-2"
      is-open
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 2 }) }} </strong>
        {{ t('component.requestSteps.order') }}
      </template>
      <template #content>
        <p>{{ t('component.requestSteps.decision') }}</p>
        <p>
          {{ t('component.requestSteps.finalDecision', { date: respondDate }) }}
        </p>
        <AppHtml
          as="p"
          :html="t('component.requestSteps.notice')"
        />
        <p>
          <strong>{{ t('component.requestSteps.noAction') }}</strong>
        </p>
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-3"
      is-open
    >
      <template #title>
        <strong>{{ t('component.requestSteps.step', { step: 3 }) }} </strong>
        {{ t('component.requestSteps.payout') }}
      </template>
      <template #content>
        <p>{{ t('component.requestSteps.payoutDecision') }}</p>
        <p>
          <strong>{{ t('component.requestSteps.noAction') }}</strong>
        </p>
      </template>
    </AppAccordionItem>
  </AppAccordion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { MY_REQUEST_DETAILS } from '@portal/router/names'

import { formatDate } from '@shared/utils/date'

type Props = {
  reference: string
  deadlineForResponseAt: string
  submittedAt: string
}

const props = defineProps<Props>()

const { locale, t } = useI18n()

const referenceCode = computed<string>(() => props?.reference?.split('-')?.[0])

const submitDate = computed<string>(() => formatDate(props.submittedAt, locale.value))

const respondDate = computed<string>(() => formatDate(props.deadlineForResponseAt, locale.value))
</script>

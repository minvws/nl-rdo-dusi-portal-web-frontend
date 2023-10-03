<template>
  <AppAccordion>
    <AppAccordionItem
      id="step-1"
      is-open
      is-highlighted
    >
      <template #title>
        <strong>{{ translate('component.requestSteps.step', { step: 1 }) }} </strong>
        {{ translate('component.requestSteps.request') }}
      </template>
      <template #content>
        <p>{{ translate('component.requestSteps.submitDate', { date: submitDate }) }}</p>
        <p>{{ translate('component.requestSteps.additionalInfo') }}</p>
        <p>
          <strong>{{ translate('component.requestSteps.info') }}</strong>
        </p>
        <RouterLink
          class="ghost"
          :to="{
            name: MY_REQUEST_DETAILS,
            params: { reference }
          }"
        >
          <AppIcon name="pdf-file" />
          {{ translate('component.requestSteps.request') }}
        </RouterLink>
        <p>
          <strong>{{ translate('component.requestSteps.customerSatisfaction') }}</strong>
        </p>
        <AppHtml
          as="p"
          :html="translate('component.requestSteps.customerSatisfactionLink', { referenceCode })"
        />
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-2"
      is-open
    >
      <template #title>
        <strong>{{ translate('component.requestSteps.step', { step: 2 }) }} </strong>
        {{ translate('component.requestSteps.order') }}
      </template>
      <template #content>
        <p>{{ translate('component.requestSteps.decision') }}</p>
        <p>
          {{ translate('component.requestSteps.finalDecision', { date: respondDate }) }}
        </p>
        <AppHtml
          as="p"
          :html="translate('component.requestSteps.notice')"
        />
        <p>
          <strong>{{ translate('component.requestSteps.noAction') }}</strong>
        </p>
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-3"
      is-open
    >
      <template #title>
        <strong>{{ translate('component.requestSteps.step', { step: 3 }) }} </strong>
        {{ translate('component.requestSteps.payout') }}
      </template>
      <template #content>
        <p>{{ translate('component.requestSteps.payoutDecision') }}</p>
        <p>
          <strong>{{ translate('component.requestSteps.approval') }}</strong>
        </p>
        <p>
          {{ translate('component.requestSteps.subsidyApplication') }}
        </p>
        <p>
          <strong>{{ translate('component.requestSteps.rejection') }}</strong>
        </p>
        <p>{{ translate('component.requestSteps.onRejection') }}</p>
        <p>
          <strong>{{ translate('component.requestSteps.noAction') }}</strong>
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

import { translate } from '@shared/i18n'

import { MY_REQUEST_DETAILS } from '@portal/router/names'

import { formatDate } from '@shared/utils/date'

type Props = {
  reference: string
  deadlineForResponseAt: string
  submittedAt: string
}

const props = defineProps<Props>()

const { locale } = useI18n()

const referenceCode = computed(() => props?.reference?.split('-')?.[0])

const submitDate = computed(() => formatDate(props.submittedAt, locale.value))

const respondDate = computed(() => formatDate(props.deadlineForResponseAt, locale.value))
</script>

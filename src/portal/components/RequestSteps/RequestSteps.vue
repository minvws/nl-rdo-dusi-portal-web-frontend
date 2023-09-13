<template>
  <AppAccordion>
    <AppAccordionItem
      id="step-1"
      is-open
      is-highlighted
    >
      <template #title><strong>Stap 1: </strong>Aanvraag</template>
      <template #content>
        <p><strong>Datum indiening: </strong>{{ submitDate }}</p>
        <p>Het kan voorkomen dat u om extra informatie gevraagd wordt.</p>
        <p><strong>Bijbehorende informatie:</strong></p>
        <RouterLink
          class="ghost"
          :to="{
            name: MY_REQUEST_DETAILS,
            params: { id }
          }"
        >
          <AppIcon name="pdf-file" />
          Aanvraag
        </RouterLink>
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-2"
      is-open
    >
      <template #title><strong>Stap 2: </strong>Beschikking</template>
      <template #content>
        <p>
          U krijgt van ons een beschikking. Dit is een goedkeuring of afwijzing van de aanvraag.
        </p>
        <p>
          13 weken na ontvangst van de aanvraag zullen wij een beslissing nemen. Uiterste
          beslisdatum komt daarmee op {{ respondDate }}.
        </p>
        <p>
          <strong>Let op</strong>, als u tussentijds om aanvullende informatie gevraagd wordt wordt
          het reactietermijn gepauzeerd totdat u de benodigde informatie geleverd heeft. Dit
          betekend dat de uiterste beslisdatum in dat geval op kan schuiven naar een later moment.
        </p>
        <p><strong>U hoeft op dit moment niets te doen.</strong></p>
      </template>
    </AppAccordionItem>
    <AppAccordionItem
      id="step-3"
      is-open
    >
      <template #title><strong>Stap 3: </strong>Uitbetaling</template>
      <template #content>
        <p>Op basis van de beschikking ontvangt u van ons wel of geen uitbetaling.</p>
        <p><strong>Bij goedkeuring</strong></p>
        <p>
          Als we uw subsidieaanvraag goedkeuren, ontvangt u het subsidiebedrag op uw rekening. Dit
          heet verlenen. We kunnen later controleren of u er daadwerkelijk recht op had. Het is dus
          eigenlijk een voorschot.
        </p>
        <p><strong>Bij afwijzing</strong></p>
        <p>Als we uw aanvraag afwijzen, ontvangt u geen subsidie.</p>
        <p><strong>U hoeft op dit moment niets te doen.</strong></p>
      </template>
    </AppAccordionItem>
  </AppAccordion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { translate } from '@shared/i18n'

import { MY_REQUEST_DETAILS } from '@shared/router/names'

import { formatDate } from '@shared/utils/date'

type Props = {
  id: string
  deadlineForResponseAt: string
  submittedAt: string
}

const props = defineProps<Props>()

const { locale } = useI18n()

const submitDate = computed(() => formatDate(props.submittedAt, locale.value))

const respondDate = computed(() => formatDate(props.deadlineForResponseAt, locale.value))
</script>

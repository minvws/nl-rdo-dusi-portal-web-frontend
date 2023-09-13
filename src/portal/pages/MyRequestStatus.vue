<template>
  <section>
    <AppIntro
      v-if="data.subsidy"
      v-bind="{
        title: data.subsidy.title,
        intro: data.intro,
        body: data.body
      }"
    />

    <AppSuspense v-bind="{ data, error, isFetching }">
      <h3>{{ translate('pages.my-request-status.status') }}</h3>
      <p>
        Uw aanvraag bevindt zich in stap {{ step }}. De huidige status van uw aanvraag staat op
        <strong>{{ status }}</strong
        >. In het onderstaande overzicht ziet u welke stappen van het proces zijn afgerond en welke
        er nog aan komen. Per stap kunt u zien wat u van ons kunt verwachten en waar nodig wat wij
        van u verwachten.
      </p>
      <div class="steps">
        <RequestSteps
          v-bind="{
            id: data.reference,
            submittedAt: data.submittedAt,
            deadlineForResponseAt: data.deadlineForResponseAt
          }"
        />
      </div>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import useSEO from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestSteps from '@portal/components/RequestSteps/RequestSteps.vue'

import { RequestStatus } from '@shared/types/request'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-status.title')}`
})

const { data, error, isFetching } = useFetchRequestDetails(props.id)

const step = computed(() => {
  const mapStatusToStep: Record<string, number> = {
    [RequestStatus.APPROVED]: 3,
    [RequestStatus.DRAFT]: 1,
    [RequestStatus.REJECTED]: 3,
    [RequestStatus.REQUEST_CHANGES]: 1,
    [RequestStatus.SUBMITTED]: 1
  }
  return data.value?.status ? mapStatusToStep[data.value.status] : 1
})

const status = computed(() => {
  const mapStatusToTranslation: Record<string, string> = {
    [RequestStatus.APPROVED]: 'Goedgekeurd',
    [RequestStatus.DRAFT]: 'Nog niet ingediend',
    [RequestStatus.REJECTED]: 'Afgekeurd',
    [RequestStatus.REQUEST_CHANGES]: 'Aanvulling nodig',
    [RequestStatus.SUBMITTED]: 'In behandeling'
  }
  return data.value?.status ? mapStatusToTranslation[data.value.status] : 'Nog niet ingediend'
})
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}

#main-content section div {
  --section-content-wrapper-gap: 1rem;
}

.steps {
  width: 100%;
  max-width: var(--max-line-length-max-width);
}
</style>

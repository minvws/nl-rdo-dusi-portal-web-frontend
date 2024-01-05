<template>
  <section>
    <AppIntro
      v-if="data.subsidy"
      v-bind="{
        title: data.subsidy.title,
        intro: data.subsidy.description,
        body: translate('pages.my-request-status.intro', { link: data.subsidy.pageUrl })
      }"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h3>{{ translate('pages.my-request-status.status') }}</h3>
      <AppHtml
        as="p"
        :html="translate('pages.my-request-status.statusDescription', { status, step })"
      />
      <div class="steps">
        <RequestSteps
          v-bind="{
            reference: data.reference,
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

import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'
import { useSEO } from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestSteps from '@portal/components/RequestSteps/RequestSteps.vue'

import { RequestStatus } from '@shared/types/request'

type Props = {
  reference: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('pages.my-request-status.title')} | ${translate('app.prefix')}`
})

const { data, error, isFetching } = useFetchRequestStatus(props.reference)

const step = computed<number>(() => {
  const mapStatusToStep: Record<string, number> = {
    [RequestStatus.APPROVED]: 3,
    [RequestStatus.DRAFT]: 1,
    [RequestStatus.REJECTED]: 3,
    [RequestStatus.REQUEST_CHANGES]: 1,
    [RequestStatus.SUBMITTED]: 1
  }
  return data.value?.status ? mapStatusToStep[data.value.status] : 1
})

const status = computed<string>(() => {
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

<template>
  <section>
    <AppIntro
      v-if="data.subsidy"
      :title="data.subsidy.title"
      :intro="data.subsidy.description"
      :body="t('pages.my-request-status.intro', { link: data.subsidy.pageUrl })"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h3>{{ t('pages.my-request-status.status') }}</h3>
      <AppHtml
        as="p"
        :html="t('pages.my-request-status.statusDescription', { status, step })"
      />
      <div class="steps">
        <RequestSteps
          :reference="data.reference"
          :submitted-at="data.submittedAt"
          :deadline-for-response-at="data.deadlineForResponseAt"
        />
      </div>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()
const { data, error, isFetching } = useFetchRequestStatus(props.reference)

useSEO({
  title: `${t('pages.my-request-status.title')} | ${t('app.prefix')}`
})

const step = computed<number>(() => {
  const mapStatusToStep: Record<string, number> = {
    [RequestStatus.APPROVED]: 3,
    [RequestStatus.DRAFT]: 1,
    [RequestStatus.PENDING]: 1,
    [RequestStatus.REJECTED]: 3,
    [RequestStatus.REQUEST_CHANGES]: 1
  }
  return data.value?.status ? mapStatusToStep[data.value.status] : 1
})

const status = computed<string>(() => {
  const mapStatusToTranslation: Record<string, string> = {
    [RequestStatus.APPROVED]: 'Goedgekeurd',
    [RequestStatus.DRAFT]: 'Nog niet ingediend',
    [RequestStatus.PENDING]: 'In behandeling',
    [RequestStatus.REJECTED]: 'Afgekeurd',
    [RequestStatus.REQUEST_CHANGES]: 'Aanvulling nodig'
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

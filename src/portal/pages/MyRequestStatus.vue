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
          :deadline-for-response-at="data.deadlineForResponseAt"
          :reference="data.reference"
          :status="data.status"
          :step="step"
          :submitted-at="data.submittedAt"
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

import { requestStatusToTranslation, statusToStep } from '@shared/utils/mappers'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, error, isFetching } = useFetchRequestStatus(props.reference)

useSEO({
  title: `${t('pages.my-request-status.title')} | ${t('app.prefix')}`
})

const step = computed<number>(() => (data.value?.status ? statusToStep[data.value.status] : 1))

const status = computed<string>(() =>
  data.value?.status ? requestStatusToTranslation[data.value.status] : 'Nog niet ingediend'
)
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

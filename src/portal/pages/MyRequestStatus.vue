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
          :final-review-deadline="data.finalReviewDeadline"
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
import { useRouter } from 'vue-router'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'
import { useSEO } from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestSteps from '@portal/components/RequestSteps/RequestSteps.vue'

import { requestStatusToTranslation, statusToStep } from '@shared/utils/mappers'
import { MY_REQUESTS_OVERVIEW } from '@portal/router/names'
import { NotificationType } from '@shared/types/notification'
import type { NotificationDisplayType } from '@shared/types/notification'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const router = useRouter()
const notificationsStore = useNotificationsStore()
const { t } = useI18n()
const { data, error, isFetching, onFetchResponse, onFetchError } = useFetchRequestStatus(props.reference)

useSEO({
  title: `${t('pages.my-request-status.title')} | ${t('app.prefix')}`
})

onFetchResponse(() => {
  redirectIfNotSubmitted()
})


onFetchError(() => {
  redirectIfError()
})

const step = computed<number>(() => (data.value?.status ? statusToStep[data.value.status] : 1))

const status = computed<string>(() =>
  data.value?.status ? requestStatusToTranslation[data.value.status] : 'Nog niet ingediend'
)

function redirectIfNotSubmitted() {
  if (Object.keys(data.value).length === 0) {
    return;
  }

  if (data.value.submittedAt) {
    return;
  }

  showNotificationAndRedirect(NotificationType.WARNING, t(`pages.my-request-status.requestNotViewable.label`), t(`pages.my-request-status.requestNotViewable.message`));
}

function redirectIfError() {
  if (!error.value) {
    return;
  }

  showNotificationAndRedirect(NotificationType.ERROR, t(`component.formNotification.error`), error.value?.message || t(`component.formNotification.unknownErrorOccurred`));
}


function showNotificationAndRedirect(displayAs: NotificationDisplayType, label: string, message: string) {
  notificationsStore.add({
    label,
    message,
    displayAs,
    id: 'my-request-status-error',
    pageChangeCount: 2,
    dismissable: true
  })

  router.push({ name: MY_REQUESTS_OVERVIEW })
}
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

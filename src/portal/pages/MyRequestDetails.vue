<template>
  <section>
    <AppIntro
      v-if="title"
      :title="title"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h2>{{ t('pages.my-request-details.meta') }}</h2>
      <DescriptionList :items="metaData" />
      <RequestDetailsForm
        :id="data.form.id"
        :values="values"
        :reference="reference"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import { useSEO } from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'
import RequestDetailsForm from '@portal/components/RequestDetailsForm/RequestDetailsForm.vue'
import { MY_REQUESTS_OVERVIEW } from '@portal/router/names'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter } from 'vue-router'
import { NotificationType } from '@shared/types/notification'
import type { NotificationDisplayType } from '@shared/types/notification'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const router = useRouter()
const { t } = useI18n()
const notificationsStore = useNotificationsStore()
const { data, error, isFetching, onFetchResponse, onFetchError, values } = useFetchRequestDetails(props.reference)

useSEO({
  title: `${t('pages.my-request-details.title')} | ${t('app.prefix')}`
})

const title = computed<string | undefined>(() => {
  const title = data.value?.subsidy?.title
  return title ? t('pages.my-request-details.heading', { title }) : undefined
})

const metaData = computed(() => {
  const { finalReviewDeadline, reference, submittedAt } = data.value
  return [
    {
      ...(reference && {
        term: t('pages.my-request-details.reference'),
        type: 'string',
        text: reference
      })
    },
    {
      ...(submittedAt && {
        term: t('pages.my-request-details.submittedAt'),
        type: 'date',
        text: submittedAt
      })
    },
    {
      ...(finalReviewDeadline && {
        term: t('pages.my-request-details.deadline'),
        type: 'date',
        text: finalReviewDeadline
      })
    }
  ]
})

onFetchResponse(() => {
  redirectIfNotViewable()
})

onFetchError(() => {
  redirectIfError()
})

function redirectIfNotViewable() {
  if (Object.keys(data.value).length === 0) {
    return;
  }

  if (data.value.submittedAt) {
    return;
  }

  showNotificationAndRedirect(NotificationType.WARNING, t(`pages.my-request-details.requestNotViewable.label`), t(`pages.my-request-details.requestNotViewable.message`));
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
    id: 'my-request-details-error',
    pageChangeCount: 2,
    dismissable: true
  })

  router.push({ name: MY_REQUESTS_OVERVIEW })
}
</script>

<template>
  <section>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <FormLoader
        :reference="data.reference"
        :id="data.form.id"
        :values="values"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'
import { useSEO } from '@shared/composables/useSeo'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

import { MY_REQUESTS_OVERVIEW } from '@portal/router/names'
import { NotificationType } from '@shared/types/notification'
import type { NotificationDisplayType } from '@shared/types/notification'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const router = useRouter()
const { t } = useI18n()
const notificationsStore = useNotificationsStore()
const { data, error, isFetching, onFetchResponse, onFetchError, values } = useFetchRequestStatus(props.reference)

useSEO({
  title: `${t('pages.my-request-edit.title')} | ${t('app.prefix')}`
})

onFetchResponse(() => {
  redirectIfNotEditable()
})

onFetchError(() => {
  redirectIfError()
})

function redirectIfNotEditable() {
  if (Object.keys(data.value).length === 0) {
    return;
  }

  if (data.value.isEditable) {
    return;
  }

  showNotificationAndRedirect(NotificationType.WARNING, t(`pages.my-request-edit.request_locked.label`), t(`pages.my-request-edit.request_locked.message`));
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
    id: 'my-request-edit-error',
    pageChangeCount: 2,
    dismissable: true
  })

  router.push({ name: MY_REQUESTS_OVERVIEW })
}
</script>

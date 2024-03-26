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
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@/@shared/store/useNotificationsStore'

import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'
import { useSEO } from '@shared/composables/useSeo'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormLoader from '@shared/components/FormLoader/FormLoader.vue'

import { MY_REQUESTS_OVERVIEW } from '@portal/router/names'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const router = useRouter()
const { t } = useI18n()
const notificationsStore = useNotificationsStore()
const { data, error, isFetching, values } = useFetchRequestStatus(props.reference)

useSEO({
  title: `${t('pages.my-request-edit.title')} | ${t('app.prefix')}`
})

const isEditable = computed(() => data.value?.isEditable || false)

watch(isEditable, (isEditable) => {
  if (!isEditable) {
    notificationsStore.add({
      label: t(`pages.my-request-edit.request_locked.label`),
      message: t(`pages.my-request-edit.request_locked.message`),
      displayAs: 'error',
      id: 'my-request-edit-error',
      pageChangeCount: 2,
      dismissable: true
    })

    router.push({ name: MY_REQUESTS_OVERVIEW })
  }
})
</script>

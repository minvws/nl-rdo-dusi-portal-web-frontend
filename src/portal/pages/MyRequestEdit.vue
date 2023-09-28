<template>
  <section>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <RequestEditForm
        :id="data.form.id"
        :values="values"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchRequestStatus } from '@portal/composables/useFetchRequestStatus'
import { useSEO } from '@shared/composables/useSeo'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestEditForm from '@portal/components/RequestEditForm/RequestEditForm.vue'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const { data, error, isFetching, values } = useFetchRequestStatus(props.reference)
useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-edit.title')}`
})
</script>

<template>
  <section>
    <div>
      <h1>{{ data.title }}</h1>
      <p class="emphasized">{{ data.intro }}</p>
      <p>{{ data.body }}</p>
    </div>

    <div>
      <h3>{{ translate('pages.my-request-details.status') }}</h3>
      <AppSuspense v-bind="{ data, error, isFetching }">
        <p>{{ data.statusIntro }}</p>
        <RequestSteps
          v-if="data.steps"
          :items="data.steps"
          @cancel="onCancel"
          @download="onDownload"
          @edit="onEdit"
        />
      </AppSuspense>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import useSEO from '@shared/composables/useSeo'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestSteps from '@portal/components/RequestSteps/RequestSteps.vue'

import { log } from '@shared/utils/logger'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-details.title')}`
})

const { data, error, isFetching } = useFetchRequestDetails(props.id)

function onDownload(event: Event) {
  log('download', event)
}

function onEdit(event: Event) {
  log('edit', event)
}

function onCancel(event: Event) {
  log('cancel', event)
}
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>

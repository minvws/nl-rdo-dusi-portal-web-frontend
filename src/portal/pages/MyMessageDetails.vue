<template>
  <section>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h1>{{ translate('pages.my-message-details.message') }}: {{ data.subject }}</h1>
      <AppHtml
        v-if="data.body"
        :html="data.body"
      />
    </AppSuspense>
    <div>
      <div class="horizontal-view">
        <AppButton
          class="ghost"
          @click="onDownload"
        >
          <AppIcon name="download" />
          {{ translate('pages.my-message-details.download') }}
        </AppButton>
        <AppButton
          class="ghost"
          @click="onPrint"
        >
          <AppIcon name="document" />
          {{ translate('pages.my-message-details.print') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { translate } from '@shared/i18n'

import { useFetchMessageDetails } from '@portal/composables/useFetchMessageDetails'
import { useFetchMessageDownload } from '@portal/composables/useFetchMessageDownload'
import useSEO from '@shared/composables/useSeo'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-message-details.title')}`
})

const { data, error, isFetching } = useFetchMessageDetails(props.id)

async function onDownload() {
  const { data, error, isFetching } = await useFetchMessageDownload(props.id)

  if (error) {
    console.error(error.value)
    return
  }

  if (!isFetching && data.value) {
    console.log('download url:', data.value)
    window.open(data.value, '_blank')
  }
}

function onPrint() {
  window.print()
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 2.5rem;
}
.html {
  gap: 1rem;
}

.horizontal-view {
  @include hide-print;
}
</style>

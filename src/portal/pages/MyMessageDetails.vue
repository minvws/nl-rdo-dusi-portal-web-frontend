<template>
  <section>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h1>{{ t('pages.my-message-details.title') }}: {{ data.subject }}</h1>
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
          {{ t('pages.my-message-details.download') }}
        </AppButton>
        <AppButton
          class="ghost"
          @click="onPrint"
        >
          <AppIcon name="document" />
          {{ t('pages.my-message-details.print') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchMessageDetails } from '@portal/composables/useFetchMessageDetails'
import { useFetchMessageDownload } from '@portal/composables/useFetchMessageDownload'
import { useSEO } from '@shared/composables/useSeo'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

import { openExternalLink } from '@shared/utils/link'

type Props = {
  id: string
}

const props = defineProps<Props>()

const fileURL = ref<string>('')

const { t } = useI18n()
const { data, error, isFetching } = useFetchMessageDetails(props.id)

useSEO({
  title: `${t('pages.my-message-details.title')} | ${t('app.prefix')}`
})

async function onDownload() {
  const { data, error, isFetching } = await useFetchMessageDownload(props.id)

  if (error.value) {
    console.error(error.value)
    return
  }

  if (!isFetching.value && data.value) {
    const file = new Blob([data.value], { type: 'application/pdf' })
    fileURL.value = URL.createObjectURL(file)
    openExternalLink(fileURL.value, '_blank')
  }
}

function onPrint() {
  window.print()
}

onBeforeUnmount(() => URL.revokeObjectURL(fileURL.value))
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

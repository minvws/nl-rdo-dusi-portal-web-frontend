<template>
  <div class="app-file-link">
    <AppLoader
      class="loader"
      v-if="isFetching"
    />
    <FormNotification
      v-else-if="error"
      display-as="error"
      :message="error"
    />
    <a
      v-else-if="fileUrl"
      :href="fileUrl"
      :title="file.name"
      ref="download"
      target="_blank"
      rel="external"
    >
      {{ file.name }}
    </a>
    <a
      v-else
      :title="file.name"
      rel="external"
      href="#"
      @click.prevent.stop="onCreateDownloadLink"
    >
      {{ file.name }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { FileType } from '@shared/types/form'

import { ref, watch } from 'vue'

import { useFileLink } from '@shared/composables/useFileLink'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  field: string
  file: FileType
  formId: string
}

const props = defineProps<Props>()

const download = ref()

const { error, isFetching, fileUrl, execute } = useFileLink({
  reference: props.formId,
  fieldCode: props.field,
  id: props.file.id,
  file: props.file
})

watch(download, (download) => download?.click())

function onCreateDownloadLink() {
  execute()
}
</script>

<style lang="scss" scoped>
.app-file-link {
  display: flex;
  justify-content: center;
  height: 100%;
}

.loader {
  width: auto;
  height: auto;
  min-height: unset;
}
</style>

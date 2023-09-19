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
      v-else
      :href="fileUrl"
      :title="file.name"
      download
      target="_blank"
      rel="external"
    >
      {{ file.name }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { type FileType } from '@shared/types/form'
import { useFileLink } from '@shared/composables/useFileLink'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  field: string
  file: FileType
  formId: string
}
const props = defineProps<Props>()

const { error, isFetching, fileUrl } = useFileLink({
  reference: props.formId,
  fieldCode: props.field,
  id: props.file.id,
  file: props.file
})
</script>

<style lang="scss" scoped>
.app-file-link {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.loader {
  width: auto;
  height: auto;
  min-height: unset;
}
</style>

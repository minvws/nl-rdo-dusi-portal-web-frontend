<template>
  <FormNotification
    :display-as="NotificationType.ERROR"
    :display-element="displayElement"
    :message="message"
    :html-id="id"
  />
</template>

<script setup lang="ts">
import type { NotificationDisplayElementType } from '@shared/types/notification'

import { computed } from 'vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import { NotificationDisplayElement, NotificationType } from '@shared/types/notification'

type Props = {
  errors: string
  id?: string
}

const props = defineProps<Props>()

const splitErrors = computed<string[]>(
  () => props.errors
    .split('\n')
    .map((item: string) => item.trim())
    .filter(Boolean)
)

const displayElement = computed<NotificationDisplayElementType>(
  () => splitErrors.value.length === 1 ? NotificationDisplayElement.P : NotificationDisplayElement.DIV
)

const message = computed<string>(
  () => {
    if (splitErrors.value.length === 1) {
      return splitErrors.value[0]
    }

    return '<ul>' + splitErrors.value.map((error: string) => `<li>${error}</li>`).join('') + '</ul>'
  }
)
</script>

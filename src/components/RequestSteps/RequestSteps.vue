<template>
  <AppAccordion>
    <AppAccordionItem
      v-for="(item, index) in items"
      :id="item.title"
      :key="index"
      is-open
    >
      <template #title>{{ item.title }}</template>
      <template #content>
        <div v-html="item.content" />
        <div class="horizontal-view">
          <AppButton
            v-if="item.actions.download"
            class="ghost"
            @click="onDownload"
          >
            <AppIcon
              name="download"
              aria-hidden="true"
            />
            {{ translate('pages.my-request-details.downloadLabel') }}
          </AppButton>
          <AppButton
            v-if="item.actions.edit"
            class="ghost"
            @click="onEdit"
          >
            <AppIcon
              name="chevron-light-right"
              aria-hidden="true"
            />
            {{ translate('pages.my-request-details.editLabel') }}
          </AppButton>
          <AppButton
            v-if="item.actions.cancel"
            class="ghost"
            @click="onCancel"
          >
            <AppIcon
              name="chevron-light-right"
              aria-hidden="true"
            />
            {{ translate('pages.my-request-details.cancelLabel') }}
          </AppButton>
          <p v-if="!item.actions.download && !item.actions.edit && !item.actions.cancel">
            <strong>{{ translate('pages.my-request-details.noAction') }}</strong>
          </p>
        </div>
      </template>
    </AppAccordionItem>
  </AppAccordion>
</template>

<script setup lang="ts">
import AppAccordion from '@/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@/components/AppAccordionItem/AppAccordionItem.vue'
import AppButton from '@/components/AppButton/AppButton.vue'

import { translate } from '@/i18n'

type RequestStepItem = {
  actions: {
    download?: boolean
    edit?: boolean
    cancel?: boolean
  }
  content: string
  title: string
}

export type RequestStepsProps = {
  items: RequestStepItem[]
}

const emit = defineEmits(['cancel', 'download', 'edit'])

defineProps<RequestStepsProps>()

function onCancel(event: Event) {
  emit('cancel', event)
}

function onDownload(event: Event) {
  emit('download', event)
}

function onEdit(event: Event) {
  emit('edit', event)
}
</script>

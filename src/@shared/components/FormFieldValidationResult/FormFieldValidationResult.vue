<template>
  <div>
    <div
      v-for="({ type, message }, index) in items"
      :key="`validation-${index}`"
      :class="type"
      class="form-field-validation-result"
    >
      <span />
      <div
        v-html="message"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormValidationEntry } from '@shared/types/form'
import type { NotificationDisplayType } from '@shared/types/notification'

import { computed } from 'vue'

const emit = defineEmits(['suggestion'])

type Props = {
  validations: FormValidationEntry[]
  id?: string
}

const props = defineProps<Props>()

const items = computed<{ message: string; type: NotificationDisplayType }[]>(() => {
  return props.validations.map(({ message, params, ...item }) => {
    if (params) {
      const keys = Object.entries(params)
      while (keys.length > 0) {
        const target = keys.pop()
        if (!target) continue
        let [key, { code, value }] = target
        const data = encodeURIComponent(JSON.stringify({ code, value }))
        message = message
          .split(`{${key}}`)
          .join(`<button class="suggestion" data-${key}="${data}">${value}</button>`)
      }
    }
    return { ...item, message }
  })
})

function onClick(event: MouseEvent): void {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  const { suggestion } = event.target.dataset

  if (event.target.nodeName !== 'BUTTON' || !suggestion) {
    return
  }

  const parsedSuggestion = JSON.parse(decodeURIComponent(suggestion))
  event.stopPropagation()
  emit('suggestion', parsedSuggestion)
}
</script>

<style lang="scss" scoped>
.form-field-validation-result {
  display: flex;
  flex-direction: row;

  span {
    width: auto;
  }
  :deep(.suggestion) {
    display: inline-block;
    width: auto;
    float: none;
    background: none;
    border: none;
    padding: 0;
    color: var(--notification-link-text-color);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

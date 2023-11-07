<template>
  <div>
    <div
      :class="type"
      v-for="({ type, message }, index) in items"
      :key="`validation-${index}`"
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
import { computed } from 'vue'

type Props = {
  validations: FormValidationEntry[]
  id?: string
}
const emit = defineEmits(['suggestion'])
const props = defineProps<Props>()

const items = computed(() => {
  return props.validations.map(({ message, params, ...item }) => {
    if (params) {
      const keys = Object.entries(params)
      while (keys.length) {
        const target = keys.pop()
        if (!target) continue
        let [key, { code, value }] = target
        const data = JSON.stringify({ code, value })
        message = message
          .split(`{${key}}`)
          .join(`<button class="suggestion" data-${key}=${data}>${value}</button>`)
      }
    }
    return { ...item, message }
  })
})

const onClick = (e: Event) => {
  const el = e.target as HTMLElement
  if (el.nodeName !== 'BUTTON') return
  e.stopPropagation()
  const { suggestion } = el.dataset
  if (!suggestion) return
  emit('suggestion', JSON.parse(suggestion))
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

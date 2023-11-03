<template>
  <div>
    <p
      :class="type"
      v-for="({ type, message }, index) in items"
      :key="`validation-${index}`"
      class="form-field-validation-result"
    >
      <span />
      <span
        v-html="message"
        @click="onClick"
      />
    </p>
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
        message = message.split(`{${key}}`).join(`<a data-${key}=${data}>${value}</a>`)
      }
    }
    return { ...item, message }
  })
})

const onClick = (e: Event) => {
  const el = e.target as HTMLElement
  if (el.nodeName !== 'A') return
  const suggestion = el.dataset.suggestion
  if (!suggestion) return
  emit('suggestion', JSON.parse(suggestion))
}
</script>

<style lang="scss" scoped>
.form-field-validation-result {
  display: flex;
}
</style>

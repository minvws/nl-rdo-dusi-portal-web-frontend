<template>
  <div class="form-checkbox-group">
    <div
      v-for="({ title, value }, index) in items"
      :key="index"
      class="checkbox"
    >
      <input
        type="checkbox"
        :value="value"
        :id="getIndexedId(index)"
        :disabled="disabled"
        :checked="values.includes(value)"
        :aria-describedby="ariaDescribedby"
        @input="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <label :for="getIndexedId(index)">{{ title }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { computed, onBeforeMount } from 'vue'
import { getA11yInputId } from '@shared/utils/a11y'

defineEmits(['change', 'focus', 'blur'])

type Props = {
  ariaDescribedby?: string
  ariaInvalid?: boolean
  autofocus?: boolean
  disabled?: boolean
  id: string
  value?: string[]
  control: Control
  handleChange: (_path: string, _value: FormValue) => void
}

const props = defineProps<Props>()

onBeforeMount(() => {
  if (!props.value) {
    return
  }

  const filteredValues = props.value.filter((value) => items.value?.some((item) => item.value === value))
  if (filteredValues.length !== props.value.length) {
    // remove invalid values and update the form
    props.handleChange(props.control.path, filteredValues)
  }
})

const values = computed<string[]>(() => props.value ?? [])

const items = computed<{ title: string; value: string }[] | undefined>(() => {
  const items = props.control.schema.items as {
    type: string
    enum?: string[]
    oneOf?: { title: string; const: string }[]
  }

  return (
    items?.oneOf?.map(({ title, const: value }) => ({ title, value })) ??
    items?.enum?.map((title) => ({ title, value: title }))
  )
})

function getIndexedId(index: number): string {
  return getA11yInputId(props.control.id, index)
}

function onChange(event: Event): void {
  event.stopPropagation()

  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  const { value, checked } = event.target
  const data = [...values.value]

  while (data.includes(value)) {
    const index = data.indexOf(value)
    data.splice(index, 1)
  }

  if (checked) {
    data.push(value)
  }

  props.handleChange(props.control.path, data)
}
</script>

<style lang="scss" scoped>
.form-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

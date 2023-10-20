<template>
  <div class="radio-control">
    <div class="radio-control-inner">
      <div
        v-for="item in items"
        :key="item.id"
      >
        <input
          v-bind="item"
          :id="`${id}-${item.id}`"
          @input="$emit('input', $event)"
          @change="$emit('change', $event)"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)"
        />
        <label :for="`${id}-${item.id}`">
          {{ item.title }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { InputType } from '@/@shared/types/input'
import { computed } from 'vue'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  id: string
  type: InputType
  control: Control
  value?: string
  disabled?: boolean
}

const props = defineProps<Props>()

const items = computed(() => {
  const values = props.control.schema as {
    enum?: string[]
    oneOf?: { title: string; const: string }[]
  }
  const {
    type,
    disabled,
    control: { data }
  } = props

  const items =
    values?.oneOf?.map(({ title, const: value }) => ({ title, value })) ||
    values?.enum?.map(title => ({ title, value: title }))

  return items?.map(({ title, value }, index) => ({
    title,
    value,
    type,
    id: index + 1,
    checked: value === data,
    disabled
  }))
})
</script>

<style lang="scss" scoped>
.radio-control-inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div {
    flex-direction: row;
  }
}
</style>

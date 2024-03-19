<template>
  <div class="radio-control">
    <div class="radio-control-inner">
      <div
        v-for="(item, index) in items"
        :key="index"
      >
        <input
          :id="getIndexedId(index)"
          v-bind="{ ...item.attrs }"
          :disabled="disabled"
          :name="id"
          :type="type"
          @input="$emit('input', $event)"
          @change="$emit('change', $event)"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)"
        />
        <label :for="getIndexedId(index)">
          {{ item.title }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { InputType } from '@shared/types/input'

import { computed } from 'vue'

import { useA11yStore } from '@shared/store/useA11yStore'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  id: string
  type: InputType
  control: Control
  value?: string
  disabled?: boolean
}

type ItemProps = {
  title: string
  attrs: {
    value: string
    checked: boolean
  }
}

const props = defineProps<Props>()

const a11yStore = useA11yStore()

const items = computed<ItemProps[] | undefined>(() => {
  const values = props.control.schema

  const items =
    values?.oneOf?.map(({ title, const: value }) => ({ title, value })) ||
    values?.enum?.map((title) => ({ title, value: title }))

  return items?.map(({ title, value }) => ({
    title,
    attrs: {
      checked: value === props.control.data,
      value
    }
  }))
})

function getIndexedId(index: number): string {
  return a11yStore.getA11yInputId(props.control.id, index)
}
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

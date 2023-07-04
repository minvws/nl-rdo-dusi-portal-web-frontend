<template>
  <div class="file-control">
    <FormTextControl
      v-bind="props"
      @change="$emit('change', $event)"
      @focus="$emit('focus', $event)"
    />
    <FormFieldRemoveFile
      v-bind="{ handleChange, id: control.id, labelFor: id }"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import FormTextControl from '@/components/form/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@/components/form/FormFieldRemoveFile/FormFieldRemoveFile.vue'
import { type InputType } from '@/type/input-types'
import { type Control } from '@/type/field-types'

defineEmits(['input', 'change', 'focus', 'blur'])

const props = defineProps<{
  id: string
  type: InputType
  control: Control
  accept?: string
  handleChange: (path: string, value: any) => void
  value?: string
  disabled?: boolean
  autofocus?: boolean
  placeholder?: string
}>()
</script>

<style lang="scss" scoped>
.file-control {
  input[type='file'] {
    color: transparent;
  }
}
</style>

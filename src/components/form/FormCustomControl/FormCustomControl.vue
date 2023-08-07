<template>
  <FormRow v-bind="wrapperProps">
    <component
      :is="field.tag"
      v-bind="field.props"
      @error="onError"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </FormRow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ControlElement } from '@jsonforms/core'
import { rendererProps } from '@jsonforms/vue'
import { useFieldValue, useFieldType, useField } from '@/composables/useField'
import { useCustomControl } from '@/composables/useCustomControl'

import FormRow from '@/components/form/FormRow/FormRow.vue'
import FormNumberControl from '@/components/form/FormNumberControl/FormNumberControl.vue'
import FormTextControl from '@/components/form/FormTextControl/FormTextControl.vue'
import FormRadioControl from '@/components/form/FormRadioControl/FormRadioControl.vue'
import FormFileControl from '@/components/form/FormFileControl/FormFileControl.vue'
import FormSelectControl from '@/components/form/FormSelectControl/FormSelectControl.vue'

export default defineComponent({
  components: {
    FormRow,
    FormTextControl,
    FormNumberControl,
    FormRadioControl,
    FormFileControl,
    FormSelectControl
  },
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props) {
    return useCustomControl(props)
  },
  computed: {
    input() {
      const {
        control: { id, enabled, schema, uischema },
        appliedOptions: { placeholder, autofocus }
      } = this
      const type = useFieldType(schema, uischema)
      const value = useFieldValue(this)
      return {
        id: `${id}-input`,
        class: `input ${type}-input`,
        type,
        disabled: !enabled,
        autofocus,
        placeholder,
        ...value
      }
    },
    wrapperProps() {
      const { styles, isFocused, appliedOptions, control, isTouched, error } = this
      const { data, description, errors, id, label, required, visible, schema, uischema } = control
      const type = useFieldType(schema, uischema)
      return {
        appliedOptions,
        data,
        description: isFocused ? description : undefined,
        errors: error || (isTouched ? errors : undefined), // only show errors when field is touched
        id,
        isFocused,
        label,
        required,
        styles,
        visible,
        contentClass: type
      }
    },
    field() {
      return useField(this)
    }
  }
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
</style>

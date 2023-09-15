<template>
  <FormRow v-bind="wrapperProps">
    <component
      :is="field.tag"
      v-bind="field.props"
      @error="onError"
      @input="onInput"
      @change="onBeforeChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </FormRow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ControlElement } from '@jsonforms/core'
import { rendererProps } from '@jsonforms/vue'

import { useFieldValue, useFieldType, useField } from '@shared/composables/form/useField'
import { useCustomControl } from '@shared/composables/form/useCustomControl'

import FormFileControl from '@shared/components/FormFileControl/FormFileControl.vue'
import FormNumberControl from '@shared/components/FormNumberControl/FormNumberControl.vue'
import FormRadioControl from '@shared/components/FormRadioControl/FormRadioControl.vue'
import FormCheckboxGroupControl from '@shared/components/FormCheckboxGroupControl/FormCheckboxGroupControl.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import FormSelectControl from '@shared/components/FormSelectControl/FormSelectControl.vue'
import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'

export default defineComponent({
  components: {
    FormFileControl,
    FormNumberControl,
    FormRadioControl,
    FormCheckboxGroupControl,
    FormRow,
    FormSelectControl,
    FormTextControl
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
      const {
        styles,
        isFocused,
        appliedOptions,
        control,
        isTouched,
        error,
        conditionalError,
        isConditionalRequired
      } = this

      const { data, description, errors, id, label, required, visible, schema, uischema } = control
      const type = useFieldType(schema, uischema)

      return {
        appliedOptions,
        data,
        description: isFocused ? description : undefined,
        errors: error || (isTouched ? errors || conditionalError : undefined), // only show errors when field is touched
        id,
        isFocused,
        label,
        required: required || isConditionalRequired,
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

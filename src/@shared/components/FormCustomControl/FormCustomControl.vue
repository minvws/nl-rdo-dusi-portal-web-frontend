<template>
  <FormRow v-bind="wrapperProps">
    <component
      :is="field.tag"
      v-bind="field.props"
      @error="onError"
      @input="onInputFromPaste"
      @change="onInputChange"
      @focus="onFocus"
      @blur="onBlur"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
    />
  </FormRow>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import type { ValidationError } from "@shared/types/field"
import { InputType } from '@shared/types/input'

import { defineComponent } from 'vue'
import { rendererProps } from '@jsonforms/vue'

import { useFieldValue, useFieldType, useField } from '@shared/composables/form/useField'
import { useCustomControl } from '@shared/composables/form/useCustomControl'

import FormCheckboxGroupControl from '@shared/components/FormCheckboxGroupControl/FormCheckboxGroupControl.vue'
import FormFileControl from '@shared/components/FormFileControl/FormFileControl.vue'
import FormNumberControl from '@shared/components/FormNumberControl/FormNumberControl.vue'
import FormRadioControl from '@shared/components/FormRadioControl/FormRadioControl.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import FormSelectControl from '@shared/components/FormSelectControl/FormSelectControl.vue'
import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'

import { getInputId } from '@shared/utils/control'
import { getA11yErrorId, getA11yExplanationId, getA11yValidationId } from '@shared/utils/a11y'

export default defineComponent({
  components: {
    FormCheckboxGroupControl,
    FormFileControl,
    FormNumberControl,
    FormRadioControl,
    FormRow,
    FormSelectControl,
    FormTextControl
  },
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props) {
    return {
      ...useCustomControl(props),
    }
  },
  computed: {
    ariaDescribedby() {
      const error = getA11yErrorId(this.control.id)
      const validation = getA11yValidationId(this.control.id)
      const explanation = getA11yExplanationId(this.control.id)

      return [error, validation, explanation].join(' ')
    },
    ariaInvalid() {
      return this.validationError ? 'true' : undefined
    },
    isFieldReadonly() {
      // @ts-expect-error readonly is not part of the JsonSchema4, but it is in the JsonSchema7
      let readonlyInSchema = this.control.schema?.readOnly

      return readonlyInSchema || this.control.uischema.options?.readonly || false
    },
    isFieldDisabled() {
      return !this.isFieldReadonly && (!this.control.enabled || this.isValidating)
    },
    input() {
      const {
        control,
        appliedOptions: { placeholder, autofocus }
      } = this
      const { schema, uischema } = control
      const type = useFieldType(schema, uischema)
      const value = useFieldValue(this)

      return {
        id: getInputId(control),
        class: `input ${type}-input`,
        type,
        disabled: this.isFieldDisabled,
        readonly: this.isFieldReadonly,
        autofocus,
        placeholder,
        ...value
      }
    },
    wrapperProps() {
      const {
        appliedOptions,
        control,
        handleChange,
        resetError,
        hideRequiredLabel,
        isConditionalRequired,
        isFocused,
        isReadOnly: isFormReadonly,
        onValid,
        onRemoteAction,
        onRemoteValidation,
        styles,
      } = this

      const { description, id, label, required, visible, schema, uischema } = control
      const type = useFieldType(schema, uischema)
      const isGroup =
        type === InputType.RADIO ||
        type === InputType.CHECKBOX ||
        type === InputType.CHECKBOX_GROUP ||
        type === InputType.FILE

      return {
        appliedOptions,
        contentClass: type,
        description: isFocused ? description : undefined,
        error: this.validationError,
        handleChange,
        resetError,
        hideRequiredLabel: hideRequiredLabel || this.isFieldReadonly || isFormReadonly,
        id,
        isFocused,
        isGroup,
        label,
        onValid,
        onRemoteAction,
        onRemoteValidation,
        required: required || isConditionalRequired,
        styles,
        validationResult: this.validationResultForControl,
        visible
      }
    },
    field() {
      return useField(this)
    },
    validationResultForControl() {
      return this.validationResult?.[this.controlId]
    },
    validationError(): ValidationError | undefined {
      if (this.error) {
        return this.error;
      }
      // only show errors when field is touched
      const error = this.control.errors || this.conditionalError
      if (this.isTouched && error) {
        return { message: error }
      }
      return undefined;
    },
  },
  methods: {
    onInputFromPaste(event: InputEvent) {
      if (event.inputType === 'insertFromPaste') {
        this.onInputChange(event)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
</style>

<style>
:root {
  /* Jsonform's .radio class conflicts with Manon's, and we want to use
   * flexbox for radios and checkboxes anyway. So we disable Manon's
   * default margins: */
  --form-fieldset-radio-margin: 0;
  --form-fieldset-checkbox-margin: 0;
}
</style>

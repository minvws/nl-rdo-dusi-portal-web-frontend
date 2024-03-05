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
      :errors="controlErrors"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
    />
  </FormRow>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import { InputType } from '@shared/types/input'

import { defineComponent } from 'vue'
import { rendererProps } from '@jsonforms/vue'

import { useA11yStore } from '@shared/store/useA11yStore'
import { useFieldValue, useFieldType, useField } from '@shared/composables/form/useField'
import { useCustomControl } from '@shared/composables/form/useCustomControl'

import FormFileControl from '@shared/components/FormFileControl/FormFileControl.vue'
import FormNumberControl from '@shared/components/FormNumberControl/FormNumberControl.vue'
import FormRadioControl from '@shared/components/FormRadioControl/FormRadioControl.vue'
import FormCheckboxGroupControl from '@shared/components/FormCheckboxGroupControl/FormCheckboxGroupControl.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import FormSelectControl from '@shared/components/FormSelectControl/FormSelectControl.vue'
import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'

import { getInputId } from '@shared/utils/control'

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
    const a11yStore = useA11yStore()

    return {
      ...useCustomControl(props),
      a11yStore
    }
  },
  computed: {
    errorId() {
      return this.a11yStore.getA11yErrorId(this.control.id)
    },
    explanationId() {
      return this.a11yStore.getA11yExplanationId(this.control.id)
    },
    validationId() {
      return this.a11yStore.getA11yValidationId(this.control.id)
    },
    ariaDescribedby() {
      const error = this.ariaInvalid ? this.errorId : ''
      const validation = !this.ariaInvalid && this.validationResult ? this.validationId : ''

      return [this.explanationId, error, validation].filter(Boolean).join(' ').trim()
    },
    ariaInvalid() {
      return this.wrapperProps.errors ? 'true' : undefined
    },
    controlErrors() {
      return this.control.errors ?? undefined
    },
    input() {
      const {
        isValidating,
        control,
        appliedOptions: { placeholder, autofocus }
      } = this
      const { enabled, schema, uischema } = control
      const type = useFieldType(schema, uischema)
      const value = useFieldValue(this)

      return {
        id: getInputId(control),
        class: `input ${type}-input`,
        type,
        disabled: !enabled || isValidating,
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
        isConditionalRequired,
        isReadOnly,
        hideRequiredLabel,
        validationResult,
        handleChange,
        onRemoteValidation,
        controlId
      } = this

      const { data, description, errors, id, label, required, visible, schema, uischema } = control
      const type = useFieldType(schema, uischema)
      const isGroup =
        type === InputType.RADIO ||
        type === InputType.CHECKBOX ||
        type === InputType.CHECKBOX_GROUP ||
        type === InputType.FILE

      return {
        appliedOptions,
        data,
        description: isFocused ? description : undefined,
        errors: error?.message || (isTouched ? errors || conditionalError : undefined), // only show errors when field is touched
        isGroup,
        id,
        isFocused,
        label,
        required: required || isConditionalRequired,
        styles,
        visible,
        contentClass: type,
        hideRequiredLabel: hideRequiredLabel || isReadOnly,
        validationResult: validationResult?.[controlId],
        handleChange,
        onRemoteValidation
      }
    },
    field() {
      return useField(this)
    }
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

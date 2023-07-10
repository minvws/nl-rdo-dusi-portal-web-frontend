<template>
  <FormRow v-bind="wrapperProps">
    <component
      :is="field.tag"
      v-bind="field.props"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </FormRow>
</template>

<script lang="ts">
import {
  type ControlElement,
  type JsonFormsRendererRegistryEntry,
  rankWith,
  isControl
} from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps } from '@jsonforms/vue'
import { useFieldValue, useFieldType, useField } from '@/composables/useField'
import { useCustomControl } from '@/composables/useCustomControl'

import FormRow from '@/components/form/FormRow/FormRow.vue'
import FormTextControl from '@/components/form/FormTextControl/FormTextControl.vue'
import FormRadioControl from '@/components/form/FormRadioControl/FormRadioControl.vue'
import FormFileControl from '@/components/form/FormFileControl/FormFileControl.vue'
import FormSelectControl from '@/components/form/FormSelectControl/FormSelectControl.vue'

const ControlRenderer = defineComponent({
  components: {
    FormRow,
    FormTextControl,
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
      const { styles, isFocused, appliedOptions, control, isTouched } = this
      const { data, description, errors, id, label, required, visible, schema, uischema } = control
      const type = useFieldType(schema, uischema)

      return {
        appliedOptions,
        data,
        description: isFocused ? description : undefined,
        errors: isTouched ? errors : undefined, // only show errors when field is touched
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
  },
  methods: {
    onFocus() {
      this.isFocused = true
    },
    onBlur() {
      this.isFocused = true
      this.setTouchedField(true)
    },
    onInput(e: Event) {
      if (!this.control.errors) return
      // validate on input when input has errors
      this.onChange(e)
    }
  }
})

export default ControlRenderer

export const CustomControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: ControlRenderer,
  tester: rankWith(1, isControl)
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
</style>

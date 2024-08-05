<template>
  <div
    v-if="visible"
    class="form-row"
    :class="className"
    :id="id"
    :role="role"
    :aria-labelledby="ariaLabelledBy"
    v-bind="errorAttribute"
  >
    <FormRowElement
      v-if="tip"
      has-left
    >
      <template #right>
        <FormNotification
          v-if="tip"
          display-as="explanation"
          :message="tip"
          :html-id="htmlId"
        />
      </template>
    </FormRowElement>

    <FormRowElement
      v-if="!hideRequiredLabel && !required && !isReadonlyField && label"
      has-left
    >
      <template #right>
        <FormRequiredLabel
          :required="required"
          :label="label"
        />
      </template>
    </FormRowElement>

    <FormRowElement
      :content-class="contentClass"
      :is-group="isGroup"
    >
      <template
        v-if="label"
        #left
      >
        <FormFieldLabel
          v-if="!isGroup"
          class="form-row-field-label"
          :class="{ margin: required && !hideRequiredLabel }"
          :for="inputId"
          :label="label"
        />
        <legend
          v-else
          class="form-row-field-label"
          :class="{ margin: required && !hideRequiredLabel }"
          :id="labelId"
        >
          {{ label }}
        </legend>
      </template>
      <template #right>
        <slot />
      </template>
      <template
        v-if="fieldDescription"
        #description
      >
        <FormFieldDescription
          :description="fieldDescription"
          :label-for="inputId"
        />
      </template>
    </FormRowElement>
    <FormRowElement
      v-if="formRowError"
      has-left
    >
      <template #right>
        <FormFieldError
          :errors="formRowError"
          :id="formRowErrorId"
        />
      </template>
    </FormRowElement>
    <FormRowElement
      v-else-if="validationResult"
      has-left
    >
      <template #right>
        <FormFieldValidationResult
          :validations="validationResult"
          :id="`${id}-validation-result`"
          @suggestion="onSuggestion"
        />
      </template>
    </FormRowElement>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Options } from '@jsonforms/vue-vanilla'
import type { FormValidationEntry, FormValue } from '@shared/types/form'
import type { ValidationError } from '@shared/types/field'

import { defineComponent, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ControlWrapper } from '@jsonforms/vue-vanilla'
import { v4 as uuid } from 'uuid'

import FormFieldDescription from '@shared/components/FormFieldDescription/FormFieldDescription.vue'
import FormFieldError from '@shared/components/FormFieldError/FormFieldError.vue'
import FormFieldLabel from '@shared/components/FormFieldLabel/FormFieldLabel.vue'
import FormFieldValidationResult from '@shared/components/FormFieldValidationResult/FormFieldValidationResult.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRequiredLabel from '@shared/components/FormRequiredLabel/FormRequiredLabel.vue'
import FormRowElement from '@shared/components/FormRowElement/FormRowElement.vue'

import { ERROR_ATTRIBUTE } from '@shared/composables/form/useFormScroll'
import { getA11yErrorId, getA11yExplanationId, getA11yInputId, getA11yValidationId } from '@shared/utils/a11y'

export default defineComponent({
  extends: ControlWrapper,
  setup() {
    const { t } = useI18n()

    return {
      labelId: uuid(),
      t
    }
  },
  props: {
    contentClass: String,
    hideRequiredLabel: Boolean,
    isGroup: Boolean,
    validationResult: Array<FormValidationEntry>,
    handleChange: Function,
    resetError: Function,
    onValid: Function,
    error: Object as PropType<ValidationError | undefined>,
  },
  components: {
    FormFieldDescription,
    FormFieldError,
    FormFieldLabel,
    FormFieldValidationResult,
    FormNotification,
    FormRequiredLabel,
    FormRowElement
  },
  computed: {
    ariaLabelledBy() {
      return this.isGroup ? this.labelId : undefined
    },
    className() {
      const { type, inline } = this.rowAppliedOptions

      return [type ?? 'row', { inline }]
    },
    errorAttribute() {
      const { errors, validationResult } = this

      return {
        [ERROR_ATTRIBUTE]: !!errors?.length || !!validationResult?.length || undefined
      }
    },
    formRowError() {
      return this.error?.message;
    },
    formRowErrorId() {
      if (this.error?.id) {
        /**
         * Receiving id is an input id for example "#/properties/fieldA-input" or "#/properties/fieldA-1-input"
         * We need to remove the "-input" part to get the correct id
         */
        const splitId = this.error?.id.split('-').slice(0, -1).join('-')
        return getA11yErrorId(splitId)
      }
      return getA11yErrorId(this.id)
    },
    fieldDescription() {
      const { description } = this.rowAppliedOptions
      return description ? this.t(description) ?? description : undefined
    },
    htmlId() {
      return getA11yExplanationId(this.id)
    },
    inputId() {
      return getA11yInputId(this.id)
    },
    isReadonlyField() {
      return this.rowAppliedOptions.readonly ?? false
    },
    role() {
      return this.isGroup ? 'group' : undefined
    },
    rowAppliedOptions(): Options & { description?: string, inline?: boolean, readonly?: boolean, tip?: string, type?: string } {
      return this.appliedOptions || {}
    },
    tip() {
      const { tip } = this.rowAppliedOptions
      return tip ? this.t(tip) ?? tip : undefined
    },
    validationId() {
      return getA11yValidationId(this.id)
    },
  },
  methods: {
    onSuggestion({ code, value }: { code: string; value: FormValue }) {
      this.handleChange?.(code, value)
      nextTick(() => this.onValid?.())
    }
  }
})
</script>

<style lang="scss" scoped>
.form-row.inline {
  .form-row-field {
    display: inline-block;
  }

  .form-row-field-label {
    margin: 0;
  }
}
</style>

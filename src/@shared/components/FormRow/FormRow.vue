<template>
  <div
    v-if="visible"
    class="form-row"
    v-bind="rowProps"
  >
    <FormRowElement
      v-if="tip"
      :has-left="true"
    >
      <template #right>
        <FormNotification
          v-if="tip"
          v-bind="{
            displayAs: 'explanation',
            message: tip,
            htmlId: `${id}-explanation`
          }"
        />
      </template>
    </FormRowElement>

    <FormRowElement
      v-if="!hideRequiredLabel && !required && label"
      :has-left="true"
    >
      <template #right>
        <FormRequiredLabel v-bind="{ required, label }" />
      </template>
    </FormRowElement>

    <FormRowElement
      v-bind="{ contentClass }"
      :is-group="isGroup"
    >
      <template
        #left
        v-if="label"
      >
        <FormFieldLabel
          v-if="!isGroup"
          class="form-row-field-label"
          :class="{ margin: required && !hideRequiredLabel }"
          :for="`${id}-input`"
          v-bind="{
            label
          }"
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
        <FormFieldDescription v-bind="{ description: fieldDescription, labelFor: `${id}-input` }" />
      </template>
    </FormRowElement>
    <FormRowElement
      v-if="errors"
      :has-left="true"
    >
      <template #right>
        <FormFieldError v-bind="{ errors, id: `${id}-error` }" />
      </template>
    </FormRowElement>
    <FormRowElement
      v-else-if="validationResult"
      :has-left="true"
    >
      <template #right>
        <FormFieldValidationResult
          :validations="validationResult"
          @suggestion="onSuggestion"
        />
      </template>
    </FormRowElement>
  </div>
</template>

<script lang="ts">
import type { Options } from '@jsonforms/vue-vanilla'

import { defineComponent, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ControlWrapper } from '@jsonforms/vue-vanilla'
import { v4 as uuidv4 } from 'uuid'

import FormFieldDescription from '@shared/components/FormFieldDescription/FormFieldDescription.vue'
import FormFieldError from '@shared/components/FormFieldError/FormFieldError.vue'
import FormFieldLabel from '@shared/components/FormFieldLabel/FormFieldLabel.vue'
import FormFieldValidationResult from '@shared/components/FormFieldValidationResult/FormFieldValidationResult.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRequiredLabel from '@shared/components/FormRequiredLabel/FormRequiredLabel.vue'
import FormRowElement from '@shared/components/FormRowElement/FormRowElement.vue'

import { ERROR_ATTRIBUTE } from '@shared/composables/form/useFormScroll'

import type { FormValidationEntry, FormValue } from '@shared/types/form'

export default defineComponent({
  extends: ControlWrapper,
  setup() {
    const { t } = useI18n()

    return {
      labelId: uuidv4(),
      t
    }
  },
  props: {
    contentClass: {
      type: String,
      required: false
    },
    hideRequiredLabel: {
      type: Boolean,
      required: false
    },
    isGroup: {
      type: Boolean,
      required: false
    },
    validationResult: {
      type: Array<FormValidationEntry>,
      required: false
    },
    handleChange: {
      type: Function,
      required: false
    },
    onRemoteValidation: {
      type: Function,
      required: false
    }
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
    tip() {
      const { appliedOptions = {} } = this
      const { tip }: Options & { tip?: string } = appliedOptions
      if (tip) return this.t(tip) ?? tip
      return undefined
    },
    fieldDescription() {
      const { appliedOptions = {} } = this
      const { description }: Options & { description?: string } = appliedOptions
      if (description) return this.t(description) ?? description
      return undefined
    },
    rowProps() {
      const { id, errors, isGroup, labelId, validationResult, appliedOptions = {} } = this
      const { type, inline }: Options & { type?: string; inline?: boolean } = appliedOptions
      return {
        id,
        role: isGroup ? 'group' : undefined,
        'aria-labelledby': isGroup ? labelId : undefined,
        class: [type ?? 'row', { inline }],
        [ERROR_ATTRIBUTE]: !!errors?.length || !!validationResult?.length || undefined
      }
    }
  },
  methods: {
    onSuggestion({ code, value }: { code: string; value: FormValue }) {
      this.handleChange?.(code, value)
      nextTick(() => this.onRemoteValidation?.())
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

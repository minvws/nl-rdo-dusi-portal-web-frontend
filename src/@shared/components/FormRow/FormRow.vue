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
      v-if="!hideRequiredLabel && !required && label"
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
          :label-for="id"
        />
      </template>
    </FormRowElement>
    <FormRowElement
      v-if="errors"
      has-left
    >
      <template #right>
        <FormFieldError
          :input-count="inputCount"
          :errors="errors"
          :id="fieldErrorId"
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
import type { Options } from '@jsonforms/vue-vanilla'
import type { FormValidationEntry, FormValue } from '@shared/types/form'
import type { ValidationError } from '@shared/types/field'

import { defineComponent, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ControlWrapper } from '@jsonforms/vue-vanilla'
import { v4 as uuid } from 'uuid'

import { useA11yStore } from '@shared/store/useA11yStore'

import FormFieldDescription from '@shared/components/FormFieldDescription/FormFieldDescription.vue'
import FormFieldError from '@shared/components/FormFieldError/FormFieldError.vue'
import FormFieldLabel from '@shared/components/FormFieldLabel/FormFieldLabel.vue'
import FormFieldValidationResult from '@shared/components/FormFieldValidationResult/FormFieldValidationResult.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRequiredLabel from '@shared/components/FormRequiredLabel/FormRequiredLabel.vue'
import FormRowElement from '@shared/components/FormRowElement/FormRowElement.vue'

import { ERROR_ATTRIBUTE } from '@shared/composables/form/useFormScroll'

export default defineComponent({
  extends: ControlWrapper,
  setup() {
    const { t } = useI18n()
    const a11yStore = useA11yStore()

    return {
      a11yStore,
      labelId: uuid(),
      t
    }
  },
  props: {
    inputCount: Number,
    contentClass: String,
    hideRequiredLabel: Boolean,
    isGroup: Boolean,
    validationResult: Array<FormValidationEntry>,
    handleChange: Function,
    onRemoteValidation: Function
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
      const { appliedOptions = {} } = this
      const { type, inline }: Options & { type?: string; inline?: boolean } = appliedOptions

      return [type ?? 'row', { inline }]
    },
    errorAttribute() {
      const { errors, validationResult } = this

      return {
        [ERROR_ATTRIBUTE]: !!errors?.length || !!validationResult?.length || undefined
      }
    },
    errorId() {
      const index = this.a11yStore.formIds.findIndex((string) => string.includes(this.id))
      const id = this.a11yStore.formIds[index]
      const splitId = id.split('-').slice(0, -1).join('-')

      return this.a11yStore.getA11yErrorId(splitId)
    },
    fieldErrorId() {
      const parent = this.$parent as Record<string, unknown> | null
      const { error } = parent as { error: ValidationError }

      if (this.validationResult) {
        return this.validationId
      } else if (error?.id) {
        return this.errorId
      } else {
        return undefined
      }
    },
    fieldDescription() {
      const { appliedOptions = {} } = this
      const { description }: Options & { description?: string } = appliedOptions

      return description ? this.t(description) ?? description : undefined
    },
    htmlId() {
      return this.a11yStore.getA11yExplanationId(this.id)
    },
    inputId() {
      return this.a11yStore.getA11yInputId(this.id)
    },
    role() {
      return this.isGroup ? 'group' : undefined
    },
    tip() {
      const { appliedOptions = {} } = this
      const { tip }: Options & { tip?: string } = appliedOptions
      return tip ? this.t(tip) ?? tip : undefined
    },
    validationId() {
      return this.a11yStore.getA11yValidationId(this.id)
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

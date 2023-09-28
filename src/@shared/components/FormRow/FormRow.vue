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
            message: tip
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

    <FormRowElement v-bind="{ contentClass }">
      <template #left>
        <FormFieldLabel
          v-if="label"
          class="form-row-field-label"
          :class="{ margin: required && !hideRequiredLabel }"
          :for="`${id}-input`"
          v-bind="{
            label
          }"
        />
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
        <FormFieldError v-bind="{ errors }" />
      </template>
    </FormRowElement>
  </div>
</template>

<script lang="ts">
import type { Options } from '@jsonforms/vue-vanilla'

import { defineComponent } from 'vue'
import { ControlWrapper } from '@jsonforms/vue-vanilla'

import FormFieldError from '@shared/components/FormFieldError/FormFieldError.vue'
import FormRowElement from '@shared/components/FormRowElement/FormRowElement.vue'
import FormFieldDescription from '@shared/components/FormFieldDescription/FormFieldDescription.vue'
import FormFieldLabel from '@shared/components/FormFieldLabel/FormFieldLabel.vue'
import FormRequiredLabel from '@shared/components/FormRequiredLabel/FormRequiredLabel.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { ERROR_ATTRIBUTE } from '@shared/composables/form/useFormScroll'

import { translate } from '@shared/i18n'

export default defineComponent({
  extends: ControlWrapper,
  props: {
    contentClass: {
      type: String,
      required: false
    },
    hideRequiredLabel: {
      type: Boolean,
      required: false
    }
  },
  components: {
    FormRowElement,
    FormFieldDescription,
    FormFieldError,
    FormFieldLabel,
    FormNotification,
    FormRequiredLabel
  },
  computed: {
    tip() {
      const { appliedOptions = {} } = this
      const { tip }: Options & { tip?: string } = appliedOptions
      if (tip) return translate(tip) ?? tip
      return undefined
    },
    fieldDescription() {
      const { appliedOptions = {} } = this
      const { description }: Options & { description?: string } = appliedOptions
      if (description) return translate(description) ?? description
      return undefined
    },
    rowProps() {
      const { id, errors, appliedOptions = {} } = this
      const { type, inline }: Options & { type?: string; inline?: boolean } = appliedOptions
      return {
        id,
        class: [type ?? 'row', { inline }],
        [ERROR_ATTRIBUTE]: !!errors?.length || undefined
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.form-row {
  &.inline {
    .form-row-field {
      display: inline-block;

      &-label {
        margin: 0;
      }
    }
  }
}
</style>

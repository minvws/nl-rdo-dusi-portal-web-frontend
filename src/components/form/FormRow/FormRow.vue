<template>
  <div
    v-if="visible"
    class="form-row"
    v-bind="rowProps"
  >
    <FormFieldLabel
      v-if="label"
      class="form-row-label"
      v-bind="{
        label
      }"
    />
    <div
      class="form-row-content"
      :class="contentClass"
    >
      <FormRequiredLabel
        v-if="!hideRequiredLabel"
        v-bind="{ required, label }"
      />
      <FormNotification
        v-if="tip"
        v-bind="{
          displayAs: 'explanation',
          message: tip
        }"
      />
      <slot />
      <FormFieldDescription
        v-if="fieldDescription"
        v-bind="{ description: fieldDescription, labelFor: `${id}-input` }"
      />
      <FormFieldError
        v-if="errors"
        v-bind="{ errors }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Options } from '@jsonforms/vue-vanilla'
import { ControlWrapper } from '@jsonforms/vue-vanilla'

import FormFieldError from '@/components/form/FormFieldError/FormFieldError.vue'
import FormFieldDescription from '@/components/form/FormFieldDescription/FormFieldDescription.vue'
import FormFieldLabel from '@/components/form/FormFieldLabel/FormFieldLabel.vue'
import FormRequiredLabel from '@/components/form/FormRequiredLabel/FormRequiredLabel.vue'
import FormNotification from '@/components/form/FormNotification/FormNotification.vue'

import { ERROR_ATTRIBUTE } from '@/composables/useFormScroll'

import { translate } from '@/i18n'

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
      const { type }: Options & { type?: string } = appliedOptions
      return {
        id,
        class: [type ?? 'row'],
        [ERROR_ATTRIBUTE]: !!errors?.length || undefined
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  flex-direction: row;
  &.column {
    flex-direction: column;
  }

  &-label {
    flex: 0.25;
  }

  &-content {
    flex: 0.75;
  }
}
</style>

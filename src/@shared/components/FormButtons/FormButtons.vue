<template>
  <div class="form-buttons">
    <AppButton
      v-if="hasPrevStep"
      class="ghost"
      :disabled="readonly"
      @click="$emit('step', index - 1)"
    >
      {{ previousLabel }}
    </AppButton>
    <AppButton
      v-if="hasSave"
      class="ghost"
      :disabled="readonly"
      @click="$emit('save', index - 1)"
    >
      {{ saveLabel }}
    </AppButton>
    <AppButton
      v-if="hasNextStep"
      :class="{ disabled: isStepDisabled(index) }"
      :disabled="readonly"
      @click="isStepDisabled(index) ? $emit('validate') : checkForValidation()"
    >
      {{ nextLabel }}
    </AppButton>
    <AppButton
      v-if="hasSubmit"
      type="submit"
      :class="{ disabled: isStepDisabled(index) }"
      :disabled="readonly"
      @click="isStepDisabled(index) ? $emit('validate') : $emit('submit')"
    >
      {{ submitLabel }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormTitle, FormButtonLabels } from '@shared/types/form'

import { computed } from 'vue'

import { useFormSubmit } from '@shared/composables/form/useFormSubmit'
import { useFormSteps } from '@shared/composables/form/useFormSteps'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import { translate } from '@shared/i18n'

const emit = defineEmits(['validate', 'step', 'save', 'submit'])

type Props = {
  forms: FormTitle[]
  formsErrors: FormError[]
  index: number
  readonly: boolean
  touched?: number[]
  buttonLabels?: FormButtonLabels
  hasSaveButton?: boolean
}

const props = defineProps<Props>()

const { onSubmitValidationOrContinue } = useFormSubmit()
const { hasPrevStep, hasNextStep, hasSave, hasSubmit, isStepDisabled, stepHasInputFields } =
  useFormSteps(props)

const previousLabel = computed(() => props.buttonLabels?.previous || translate('form.button.prev'))

const startLabel = computed(() => props.buttonLabels?.start || translate('form.button.start'))

const nextLabel = computed(() =>
  props.index === 0 ? startLabel.value : props.buttonLabels?.next || translate('form.button.next')
)

const saveLabel = computed(() => props.buttonLabels?.save || translate('form.button.save'))

const submitLabel = computed(() => props.buttonLabels?.submit || translate('form.button.submit'))

async function checkForValidation() {
  stepHasInputFields.value ? await onSubmitValidationOrContinue() : emit('step', props.index + 1)
}
</script>

<style lang="scss" scoped>
.form-buttons {
  display: flex;
  flex-direction: row;

  @include mobile {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
}
</style>

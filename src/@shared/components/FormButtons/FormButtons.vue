<template>
  <div class="form-buttons">
    <AppButton
      v-if="hasPrevStep"
      type="button"
      class="ghost"
      :disabled="readonly"
      @click="$emit('step', index - 1)"
    >
      {{ previousLabel }}
    </AppButton>
    <AppButton
      v-if="hasSave"
      type="button"
      class="ghost"
      :disabled="readonly"
      @click="$emit('save', index - 1)"
    >
      {{ saveLabel }}
    </AppButton>
    <AppButton
      v-if="hasNextStep"
      type="button"
      :class="{ disabled: isStepDisabled(index) }"
      :disabled="readonly"
      @click="isStepDisabled(index) ? $emit('validate') : $emit('step', index + 1)"
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
import { useFormSteps } from '@shared/composables/form/useFormSteps'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

defineEmits(['validate', 'step', 'save', 'submit'])

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

const { hasPrevStep, hasNextStep, hasSave, hasSubmit, isStepDisabled } =
  useFormSteps(props)

const previousLabel = computed(() => props.buttonLabels?.previous || translate('form.button.prev'))

const startLabel = computed(() => props.buttonLabels?.start || translate('form.button.start'))

const nextLabel = computed(() =>
  props.index === 0 ? startLabel.value : props.buttonLabels?.next || translate('form.button.next')
)

const saveLabel = computed(() => props.buttonLabels?.save || translate('form.button.save'))

const submitLabel = computed(() => props.buttonLabels?.submit || translate('form.button.submit'))
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

<template>
  <div class="form-buttons">
    <AppButton
      v-if="hasPrevStep"
      type="button"
      class="ghost"
      :disabled="readonly"
      @click="$emit('step', index - 1)"
    >
      {{ translate('form.button.prev') }}
    </AppButton>
    <AppButton
      v-if="hasNextStep"
      type="submit"
      :class="{ disabled: isStepDisabled(index) }"
      :disabled="readonly"
      @click="isStepDisabled(index) ? $emit('validate') : $emit('step', index + 1)"
    >
      {{ translate(index === 0 ? 'form.button.start' : 'form.button.next') }}
    </AppButton>
    <AppButton
      v-if="hasSubmit"
      type="submit"
      :class="{ disabled: isStepDisabled(index) }"
      :disabled="readonly"
      @click="isStepDisabled(index) ? $emit('validate') : $emit('submit')"
    >
      {{ translate('form.button.submit') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormTitle } from '@shared/types/form'
import { useFormSteps } from '@shared/composables/useFormSteps'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

defineEmits(['validate', 'step', 'submit'])

type Props = {
  forms: FormTitle[]
  formsErrors: FormError[]
  index: number
  readonly: boolean
  touched?: number[]
}

const props = defineProps<Props>()

const { hasPrevStep, hasNextStep, hasSubmit, isStepDisabled } = useFormSteps(props)
</script>

<style lang="scss" scoped>
.form-buttons {
  display: flex;
  flex-direction: row;
  padding-top: 2em;
}
</style>

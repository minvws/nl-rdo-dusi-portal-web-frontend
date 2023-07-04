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
      {{ translate('form.button.next') }}
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
import type { FormError, FormTitle } from '@/type/form-types'
import { useFormSteps } from '@/composables/useFormSteps'
import { translate } from '@/i18n'

import AppButton from '@/components/AppButton/AppButton.vue'

defineEmits(['validate', 'step', 'submit'])

type Props = {
  forms: FormTitle[]
  index: number
  formsErrors: FormError[]
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

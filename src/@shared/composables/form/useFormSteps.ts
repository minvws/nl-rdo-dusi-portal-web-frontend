import type { UISchemaElement } from '@jsonforms/core'
import type { FormTitle, FormError } from '@shared/types/form'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useValidationStore } from '@shared/store/useValidationStore'

import { hasCustomControl } from '@shared/utils/form'

type Props = {
  forms: FormTitle[]
  index: number
  formsErrors: FormError[]
  touched?: number[]
  hasSaveButton?: boolean
}

export const useFormSteps = (props: Props) => {
  const { forms, activeForm } = useActiveForm()
  const validationStore = useValidationStore()
  const { canContinueAfterValidation } = storeToRefs(validationStore)

  const hasSteps = computed(() => steps.value > 1)
  const hasForms = computed(() => !!steps.value)
  const hasPrevStep = computed(() => hasForms.value && props.index > 0)
  const hasNextStep = computed(() => hasForms.value && props.index < props.forms.length - 1)
  const hasSubmit = computed(() => props.index === props.forms.length - 1)
  const hasSave = computed(() =>
    !props.hasSaveButton ? false : hasPrevStep.value || hasSubmit.value
  )
  const isCurrentStepValid = computed(() => !props.formsErrors[props.index]?.length)
  const steps = computed(() => props.forms.length)
  const stepHasInputFields = computed(() => {
    const schema = forms.value[activeForm.value.index].uischema as UISchemaElement & {
      elements: []
    }
    return schema.elements.map(element => hasCustomControl(element)).some(value => value)
  })

  function hasErrors() {
    return props.formsErrors
      ?.map((errors, index) => (!errors?.length ? undefined : index))
      .filter((value: number | undefined) => value !== undefined) as number[]
  }

  function isStepDisabled(index: number) {
    return !canContinueAfterValidation.value && !!hasErrors()?.some((step: number) => step <= index)
  }

  function isTouched(index: number) {
    return index < 0 ? true : props.touched?.includes(index)
  }

  return {
    hasPrevStep,
    hasNextStep,
    hasSave,
    hasSteps,
    hasSubmit,
    hasErrors,
    isStepDisabled,
    isTouched,
    isCurrentStepValid,
    steps,
    stepHasInputFields
  }
}

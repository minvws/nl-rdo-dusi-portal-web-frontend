import type { UISchemaElement } from '@jsonforms/core'
import type { FormTitle, FormErrors } from '@shared/types/form'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useValidationStore } from '@shared/store/useValidationStore'

import { hasCustomControl } from '@shared/utils/form'

type Props = {
  forms: FormTitle[]
  index: number
  formsErrors: FormErrors
  touched?: number[]
  hasSaveButton?: boolean
}

export const useFormSteps = (props: Props) => {
  const { forms, activeForm } = useActiveForm()
  const validationStore = useValidationStore()
  const { canContinueAfterValidation } = storeToRefs(validationStore)

  const hasSteps = computed<boolean>(() => steps.value > 1)

  const hasForms = computed<boolean>(() => !!steps.value)

  const hasPrevStep = computed<boolean>(() => hasForms.value && props.index > 0)

  const hasNextStep = computed<boolean>(
    () => hasForms.value && props.index < props.forms.length - 1
  )

  const hasSubmit = computed<boolean>(() => props.index === props.forms.length - 1)

  const hasSave = computed<boolean>(() =>
    props.hasSaveButton ? hasPrevStep.value || hasSubmit.value : false
  )

  const isCurrentStepValid = computed<boolean>(() => {
    const errors = props.formsErrors[props.index]
    return !errors || (Array.isArray(errors) && errors.length === 0)
  })

  const steps = computed<number>(() => props.forms.length)

  const stepHasInputFields = computed<boolean>(() => {
    const schema = forms.value[activeForm.value.index].uischema as UISchemaElement & {
      elements: []
    }
    return schema.elements.map((element) => hasCustomControl(element)).some(Boolean)
  })

  const hasErrors = computed<number[]>(() => {
    return props.formsErrors
      ?.map((errors, index) => (Array.isArray(errors) && errors.length > 0 ? index : undefined))
      .filter((value: number | undefined) => value !== undefined) as number[]
  })

  function isStepDisabled(index: number) {
    return (
      !canContinueAfterValidation.value && !!hasErrors.value?.some((step: number) => step <= index)
    )
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

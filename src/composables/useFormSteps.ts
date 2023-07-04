import type { FormTitle, FormError } from '@/type/form-types'
import { computed } from 'vue'

export const useFormSteps = (props: {
  forms: FormTitle[]
  index: number
  formsErrors: FormError[]
  touched?: number[]
}) => {
  const hasErrors = () => {
    return props.formsErrors
      ?.map((errors, index) => {
        if (!errors?.length) return undefined
        return index
      })
      .filter((value: number | undefined) => value !== undefined) as number[]
  }

  const isStepDisabled = (index: number) => {
    return !!hasErrors()?.some((step: number) => step <= index)
  }

  const isTouched = (index: number) => {
    if (index < 0) return true
    return props.touched?.includes(index)
  }

  const steps = computed(() => {
    return props.forms.length
  })

  const hasSteps = computed(() => {
    return steps.value > 1
  })

  const hasForms = computed(() => {
    return !!steps.value
  })

  const hasPrevStep = computed(() => {
    return hasForms.value && props.index > 0
  })

  const hasNextStep = computed(() => {
    return hasForms.value && props.index < props.forms.length - 1
  })

  const hasSubmit = computed(() => {
    return props.index === props.forms.length - 1
  })

  const isCurrentStepValid = computed(() => {
    return !props.formsErrors[props.index]?.length
  })

  return {
    hasPrevStep,
    hasNextStep,
    hasSteps,
    hasSubmit,
    hasErrors,
    isStepDisabled,
    isTouched,
    isCurrentStepValid,
    steps
  }
}

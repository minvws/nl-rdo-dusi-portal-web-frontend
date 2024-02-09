import { computed } from 'vue'

import { useForms } from '@shared/composables/form/useForms'

export const useFormConditionalIsRequired = (id: string) => {
  // for now we assume if a field becomes visible due
  // to a rule with effect 'SHOW' it is a required field
  const { getScopedElement } = useForms()

  const isConditionalRequired = computed<boolean | undefined>(() => {
    const scopedElement = getScopedElement(id)
    return scopedElement?.rule?.effect ? scopedElement?.rule?.effect === 'SHOW' : undefined
  })

  return {
    isConditionalRequired
  }
}

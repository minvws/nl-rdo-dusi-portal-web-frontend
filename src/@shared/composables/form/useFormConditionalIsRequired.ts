import { useForms } from '@shared/composables/form/useForms'

export const useFormConditionalIsRequired = (id: string) => {
  // for now we assume if a field becomes visible due
  // to a rule with effect 'SHOW' it is a required field

  const { getScopedElement } = useForms()
  return getScopedElement(id)?.rule?.effect === 'SHOW'
}

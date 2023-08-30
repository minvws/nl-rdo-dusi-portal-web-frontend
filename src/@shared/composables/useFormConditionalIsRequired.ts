import { useFormStore } from '@shared/store/useFormStore'

export const useFormConditionalIsRequired = (id: string) => {
  // for now we assume if a field becomes visible due
  // to a rule with effect 'SHOW' it is a required field

  const { getScopedElement } = useFormStore()
  return getScopedElement(id)?.rule?.effect === 'SHOW'
}

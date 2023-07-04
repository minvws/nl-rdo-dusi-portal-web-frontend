import { watch, ref, type Ref, type ComputedRef, computed } from 'vue'

export const useTouchedForms = ({
  formKey,
  activeForm
}: {
  formKey: ComputedRef<string>
  activeForm: ComputedRef<{ id: string; index: number }>
}) => {
  const touched: Ref<Record<string, number[]>> = ref({})

  const touchedForms = computed(() => {
    return touched.value[activeForm.value.id]
  })

  const clearTouchedForms = (id?: string) => {
    if (!id) return
    delete touched.value[id]
  }

  watch(
    () => formKey.value,
    () => {
      const form = activeForm.value
      if (!form) return
      if (!touchedForms.value) touched.value[activeForm.value.id] = []
      const { index } = form
      if (!touchedForms.value.includes(index)) {
        touchedForms.value.push(index)
      }
    },
    { immediate: true }
  )

  return {
    touchedForms,
    clearTouchedForms
  }
}

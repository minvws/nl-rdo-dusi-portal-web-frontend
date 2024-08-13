import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePendingFileStore = defineStore('usePendingFileStore', () => {
  type PendingFieldProps = PendingFieldFormProps & {
    fieldName: string
  }

  type PendingFieldFormProps = {
    formId: string
  }

  const pending = ref<Record<string, Record<string, boolean[]>>>({})

  function setPending({ formId, fieldName }: PendingFieldProps, index: number): void {
    // initialize pending state
    if (pending.value[formId] === undefined) {
      pending.value[formId] = {}
    }

    const pendingState = pending.value[formId]
    const filesPending = [...(pendingState?.[fieldName] || [])]

    filesPending[index] = true
    pendingState[fieldName] = filesPending

    return
  }

  function getPending({ formId, fieldName }: PendingFieldProps): ComputedRef<boolean[]> {
    return computed(() => {
      return pending.value[formId]?.[fieldName] || []
    })
  }

  function clearPending({ formId, fieldName }: PendingFieldProps, index: number): void {
    const pendingState = pending.value[formId]
    const filesPending = [...(pendingState?.[fieldName] || [])]

    filesPending[index] = false
    pendingState[fieldName] = filesPending

    return
  }

  function clearPendings({ formId }: PendingFieldFormProps): void {
    delete pending.value[formId]
  }

  function clearAll(): void {
    pending.value = {}
  }

  return {
    pending,
    setPending,
    getPending,
    clearPending,
    clearPendings,
    clearAll
  }
})

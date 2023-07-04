import { getControlId } from '@/util/control-util'
import { ref, type Ref, type ComputedRef } from 'vue'

export const useFiles = ({ activeForm }: { activeForm: ComputedRef<{ id: string }> }) => {
  const files: Ref<Record<string, Record<string, File>>> = ref({})

  const addFile = (name: string, file: File) => {
    const id = activeForm.value.id
    if (!files.value[id]) files.value[id] = {}
    files.value[id][name] = file
  }

  const removeFile = (name: string) => {
    const id = activeForm.value.id
    delete files.value[id][name]
  }

  const addOrRemoveFile = (id: string, target?: HTMLInputElement) => {
    const file = target?.files?.[0]
    const name = getControlId(id)
    if (file) addFile(name, file)
    else removeFile(name)
  }

  const getFile = (id: string) => {
    const formId = activeForm.value.id
    const name = getControlId(id)
    return files.value[formId]?.[name]
  }

  const clearFiles = (id?: string) => {
    if (!id) return
    delete files.value[id]
  }

  return {
    clearFiles,
    addOrRemoveFile,
    getFile,
    files
  }
}

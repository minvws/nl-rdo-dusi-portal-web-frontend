import type { FileLink } from '@shared/types/link'
import type { FileType } from '@shared/types/form'

import { computed, onBeforeUnmount } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useApiGetFileUrl } from './useApiUrl'

export const useFileLink = (props: FileLink & { file: FileType }) => {
  const url = useApiGetFileUrl(props)
  const { data, error, ...fetch } = useCustomFetch('with-encryption', url, undefined, {
    immediate: false
  }).blob()

  const fileUrl = computed<string | undefined>(() => {
    if (!data.value || error.value) return undefined
    const {
      file: { mimeType: type }
    } = props
    const file = new Blob([data.value], { type })
    return URL.createObjectURL(file)
  })

  onBeforeUnmount(() => {
    if (!fileUrl.value) return
    URL.revokeObjectURL(fileUrl.value)
  })

  return {
    data,
    error,
    fileUrl,
    ...fetch
  }
}

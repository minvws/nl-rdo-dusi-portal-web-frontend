import { computed, onBeforeUnmount } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiGetFileUrl } from './useApiUrl'
import type { FileLink } from '@shared/types/link'
import type { FileType } from '../types/form'

export const useFileLink = (props: FileLink & { file: FileType }) => {
  const url = useApiGetFileUrl(props)
  const { data, error, ...fetch } = useFetchWithCredentials(url).blob()

  const fileUrl = computed(() => {
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

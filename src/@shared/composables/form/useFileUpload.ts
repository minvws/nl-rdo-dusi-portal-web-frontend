import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { watch } from 'vue'

export const useFileUpload = () => {
  const upload = ({ name, file, draftId }: { name: string; file: File; draftId?: string }) => {
    const url = useApiFileUrl(draftId)
    const payload = new FormData()
    payload.append('fieldCode', name)
    payload.append('file', file)

    const { data } = useFetchWithCredentials(url).post(payload).json()

    watch(data, data => console.log(data))
  }
  return {
    upload
  }
}

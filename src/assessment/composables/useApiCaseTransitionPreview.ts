import type { Column } from '@shared/types/table'

import { computed, watch } from 'vue'

import { t } from '@shared/i18n'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import {
  useApiCaseTransitionPreviewUrl,
  useApiCaseTransitionPreviewSubmitUrl
} from '@assessment/composables/useApiUrl'

import { statusToIcon } from '@shared/utils/mappers'
import { useRouter } from 'vue-router'

export const useApiCaseTransitionPreview = (id: string) => {
  const types = ['current', 'target']
  const router = useRouter()

  const { data: json, ...fetch } = useFetchWithCredentials(
    useApiCaseTransitionPreviewUrl(id)
  ).json()

  const {
    execute,
    isFetching: isSubmitting,
    error: submitError,
    data: submitData
  } = useFetchWithCredentials(useApiCaseTransitionPreviewSubmitUrl(id), undefined, {
    immediate: false
  })
    .patch()
    .json()

  const transition = computed(() => (json.value ? json.value?.data?.transition : undefined))

  const columns = computed<Column[]>(() => [
    { id: 'title' },
    ...types.map(id => ({
      id,
      text: t(`pages.preview-case-submit.column.${id}`)
    }))
  ])

  const data = computed(() => [
    {
      title: {
        text: t('pages.preview-case-submit.column.status')
      },
      ...types.reduce((cul, type) => {
        const status = transition.value?.[type]?.application?.status
        const value = {
          type: 'string',
          icon: statusToIcon[status],
          text: t(`requestStatus.status.${status}`)
        }
        return { ...cul, [type]: value }
      }, {})
    },
    {
      title: {
        text: t('pages.preview-case-submit.column.phase')
      },
      ...types.reduce((cul, type) => {
        const text = transition.value?.[type]?.subsidyStage?.title
        const value = {
          type: 'string',
          text
        }
        return { ...cul, [type]: value }
      }, {})
    }
  ])

  const html = computed(() => transition.value?.message?.html)

  function onSubmit() {
    execute()
  }

  watch(submitData, submitData => {
    if (!submitData) return
    router.go(-1)
  })

  return {
    transition,
    data,
    columns,
    html,
    isSubmitting,
    onSubmit,
    submitError,
    submitData,
    ...fetch
  }
}

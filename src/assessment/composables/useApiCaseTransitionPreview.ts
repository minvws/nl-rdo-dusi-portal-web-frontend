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
import { formatAsReadableDate } from '@shared/utils/date'

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
    ...types.map((id) => ({
      id,
      text: t(`pages.preview-case-submit.column.${id}`)
    }))
  ])

  const data = computed(() => {
    const result: Record<string, unknown>[] = [
      {
        title: {
          text: t('pages.preview-case-submit.column.status')
        }
      },
      {
        title: {
          text: t('pages.preview-case-submit.column.phase')
        }
      }
    ]

    for (const type of types) {
      const status = transition.value?.[type]?.application?.status
      const text = transition.value?.[type]?.subsidyStage?.title
      const deadline = transition.value?.[type]?.deadline

      result[0][type] = {
        type: 'string',
        icon: statusToIcon[status],
        text: t(`requestStatus.status.${status}`)
      }

      result[1][type] = {
        type: 'string',
        text
      }

      addDeadlineColumn(result, type, deadline)
    }

    return result
  })

  const html = computed(() => transition.value?.message?.html)

  function onSubmit() {
    execute()
  }

  watch(submitData, (submitData) => {
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

function addDeadlineColumn(result: Record<string, unknown>[], type: string, value: string|null|undefined) {
  if (!value) {
    return
  }

  if (result.length < 3) {
    result.push({
      title: {
        text: t('pages.preview-case-submit.column.deadline')
      },
      current: {
        type: 'string',
        text: '-'
      },
      target: {
        type: 'string',
        text: '-'
      }
    })
  }

  result[2][type] = {
    type: 'string',
    text: value ? formatAsReadableDate(value, 'nl-NL') : '-'
  }
}

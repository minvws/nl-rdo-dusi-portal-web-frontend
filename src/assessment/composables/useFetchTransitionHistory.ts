import type {
  HistoryTransitionStage,
  HistoryTransition,
  History
} from '@shared/types/history-transition'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiTransitionHistoryUrl } from '@assessment/composables/useApiUrl'

import { formatAsDateWithTime } from '@shared/utils/date'
import { t } from '@shared/i18n'

const transformStage = (stage: HistoryTransitionStage) => {
  return {
    title: stage.subsidyStage.title,
    assessor: stage.assessorUser?.name,
    stage: stage.subsidyStage.stage
  }
}

const OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
} as Intl.DateTimeFormatOptions

export const useFetchTransitionHistory = (id: string) => {
  const url = useApiTransitionHistoryUrl(id)
  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url })

  const data = computed(() => {
    const data = json.value?.data as HistoryTransition[]
    if (!data) return []
    return data.map(
      ({ createdAt, message, internalNote, subsidyStageTransition, previousApplicationStage }) => {
        return {
          date: createdAt,
          formattedDate: formatAsDateWithTime(createdAt, 'NL-nl', OPTIONS),
          description: subsidyStageTransition.description,
          subject: message?.subject,
          internalNote,
          items: [transformStage(previousApplicationStage)],
          message
        }
      }
    )
  })

  const transitionHistory = computed<History | undefined>(() => {
    if (!data.value?.length) return undefined
    const elements = data.value.map((item) => ({
      type: 'FormTransitionHistory',
      options: { item }
    }))

    return {
      title: t('component.transitionHistory.title') ?? '',
      forms: [
        {
          dataschema: {},
          uischema: {
            type: 'FormGroupControl',
            options: {
              section: true
            },
            elements
          }
        }
      ],
      noButtons: true
    }
  })

  return {
    transitionHistory,
    ...fetch
  }
}

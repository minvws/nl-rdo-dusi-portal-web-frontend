import type {
  HistoryTransitionStage,
  HistoryTransition,
  History
} from '@shared/types/history-transition'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiTransitionHistoryUrl } from '@assessment/composables/useApiUrl'

import { formatDateWithTime } from '@shared/utils/date'
import { useI18n } from 'vue-i18n'

const transformStage = (stage: HistoryTransitionStage) => {
  return {
    title: stage.subsidyStage.title,
    assessor: stage.assessorUser?.name,
    stage: stage.subsidyStage.stage
  }
}

const OPTIONS = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
} as Intl.DateTimeFormatOptions

export const useFetchTransitionHistory = (id: string) => {
  const { t } = useI18n()
  const url = useApiTransitionHistoryUrl(id)
  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url })

  const data = computed(() => {
    const data = json.value?.data as HistoryTransition[]
    if (!data) return []
    return data.map(
      ({ createdAt, message, internalNote, subsidyStageTransition, previousApplicationStage }) => {
        return {
          date: createdAt,
          formattedDate: formatDateWithTime(createdAt, 'NL-nl', OPTIONS),
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
    const elements = data.value.map(item => ({
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

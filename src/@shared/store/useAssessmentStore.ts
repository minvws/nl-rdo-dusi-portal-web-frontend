import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { AssessmentsData } from '@shared/types/table'
import type { FilterItem } from '@shared/types/filters'

import { useApiAssessmentDetailsUrl } from '@shared/composables/useAssessmentApiUrl'
import { formatFiltersData } from '@shared/utils/format'
import { transformAssessmentsData, transformMyAssessmentsData } from '@shared/utils/transform'

export const useAssessmentStore = defineStore('useAssessmentStore', () => {
  const assessments = ref({}) as Ref<AssessmentsData>
  const assessment = ref({}) as Ref<any>
  const filters = ref([]) as Ref<FilterItem[]>
  const error = ref(null) as any
  const isFetching = ref(false)

  async function fetchAllAssessments(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url)
      const json = await response.json()
      const formattedData = transformAssessmentsData(json)

      assessments.value = formattedData
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  async function fetchAssessment(id: string) {
    const url = useApiAssessmentDetailsUrl(id)
    isFetching.value = true

    try {
      const response = await fetch(url)
      const json = await response.json()
      assessment.value = json
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  async function fetchMyAssessments(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url, { method: 'GET' })
      const json = await response.json()
      const formattedData = transformMyAssessmentsData(json)

      assessments.value = formattedData
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  async function fetchFilters(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url)
      const json = await response.json()
      const formattedFilters = formatFiltersData(json)

      filters.value = formattedFilters
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  async function filterAssessments(id: string) {
    // @TODO: implement filter, fake for now.
    isFetching.value = true
    console.log('filterAssessments', id)

    setTimeout(() => {
      isFetching.value = false
    }, 1000)
  }

  const request = computed(() => {
    return assessment.value?.data?.stages.find((stage: any) => stage.metadata.title === 'Aanvraag')
  })

  const reviews = computed(() => {
    return assessment.value?.data?.stages.filter(
      (stage: any) => stage.metadata.title === 'Beoordeling'
    )
  })

  const reviewForm = computed(() => {
    return assessment.value?.data?.stages.filter(
      (stage: any) => stage.metadata.title === 'Beoordeling' && stage.metadata.uiType === 'INPUT'
    )
  })

  return {
    assessment,
    request,
    reviews,
    reviewForm,
    assessments,
    error,
    fetchAllAssessments,
    fetchAssessment,
    fetchFilters,
    fetchMyAssessments,
    filterAssessments,
    filters,
    isFetching
  }
})

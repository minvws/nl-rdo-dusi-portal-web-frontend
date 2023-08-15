import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { AssessmentData } from '@shared/types/table'

import { transformAssessmentsData, transformMyAssessmentsData } from '@shared/utils/transform'

export const useAssessmentStore = defineStore('useAssessmentStore', () => {
  const assessments = ref({}) as Ref<AssessmentData>
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

  async function fetchMyAssessments(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url)
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

  async function filterAssessments(id: string) {
    // @TODO: implement filter, fake for now.
    isFetching.value = true
    assessments.value = {} as AssessmentData
    console.log('filterAssessments', id)

    setTimeout(() => {
      isFetching.value = false
    }, 1000)
  }

  return {
    error,
    isFetching,
    assessments,
    fetchAllAssessments,
    fetchMyAssessments,
    filterAssessments
  }
})

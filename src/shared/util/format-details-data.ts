import type { DescriptionListDetails, DescriptionListItem } from '@/shared/type/details-types'

type DetailsDataInput = {
  title: string
  data: Record<string, DescriptionListDetails>
}[]

type DetailsDataOutput = {
  title: string
  data: DescriptionListItem[]
}[]

/**
 * Formats data from the API for the details component.
 *
 * @param {DetailsDataInput} data - The data to format.
 * @returns {DetailsDataOutput} The formatted data.
 */
export default function formatDetailsData(data: DetailsDataInput): DetailsDataOutput {
  return data.map(item => ({
    title: item.title,
    data: Object.entries(item.data).map(([term, details]) => ({ term, details }))
  }))
}

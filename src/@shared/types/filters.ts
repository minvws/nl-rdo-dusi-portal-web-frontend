export type FiltersDataInput = {
  data: Record<string, number>
}

export type FilterItem = {
  text: string | undefined
  id: string
  count: number
}

export type FiltersDataOutput = FilterItem[]

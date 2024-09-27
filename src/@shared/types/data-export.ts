export const DAMU_SUBSIDY_ID = '7b9f1318-4c38-4fe5-881b-074729d95abf'

export const DataExportType = {
  FDC_DATA_EXPORT: 'fdc-data-export',
  DAMU_DATA_EXPORT: 'damu-data-export'
} as const

export type DateExportProps = {
  hasDateFilters: boolean
  endpointUrl: string
}

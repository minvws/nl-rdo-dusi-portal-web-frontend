import type { UserRole } from "@shared/types/user"
import { UserRoleNameType } from "@shared/types/user"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@assessment/store/useAuthStore"
import { DAMU_SUBSIDY_ID, DataExportType, type DateExportProps } from "@shared/types/data-export"
import { useApiDamuDataExportUrl, useApiDataExportUrl } from "@assessment/composables/useApiUrl"

export const useDataExport = () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const isExportAllowed = function(exportName: string) {
    switch (exportName) {
      case DataExportType.FDC_DATA_EXPORT:
        return !!user.value?.roles.find((role: UserRole) => role.name === UserRoleNameType.DATA_EXPORTER)
      case DataExportType.DAMU_DATA_EXPORT:
        return !!user.value?.roles.find((role: UserRole) => implementationCoordinatorExportAllowed(role, DAMU_SUBSIDY_ID))
      default:
        return false
    }
  }

  const getDataExportComponentProps = function(exportName: string): DateExportProps | undefined {
    if (exportName === DataExportType.FDC_DATA_EXPORT && isExportAllowed(DataExportType.FDC_DATA_EXPORT)) {
      return {
        hasDateFilters: true,
        endpointUrl: useApiDataExportUrl()
      }
    }

    if (exportName === DataExportType.DAMU_DATA_EXPORT && isExportAllowed(DataExportType.DAMU_DATA_EXPORT)) {
      return {
        hasDateFilters: false,
        endpointUrl: useApiDamuDataExportUrl()
      }
    }

    return undefined
  }

  return {
    isExportAllowed,
    getDataExportComponentProps
  }
}

export const implementationCoordinatorExportAllowed = (role: UserRole, subsidyId: string) => {
  return role.name === UserRoleNameType.IMPLEMENTATION_COORDINATOR && role.subsidy.id === subsidyId
}

export const implementationCoordinatorHasAllowedExports = (role: UserRole) => {
  const allowedSubsidies = [DAMU_SUBSIDY_ID]

  return allowedSubsidies.some(subsidyId => implementationCoordinatorExportAllowed(role, subsidyId))
}

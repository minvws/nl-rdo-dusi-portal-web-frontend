import { t } from '@shared/i18n'

export function formatFile(path = ''): string | undefined {
  const file = path.split('\\')
  return file[file.length - 1] || t('form.component.fileInput.chooseFile')
}

export function formatFileSize(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function fromCamelCaseToSnakeCase(target: string): string {
  return target.replaceAll(/[A-Z]/g, (char: string) => `_${char.toLowerCase()}`)
}

export function formatPayloadFromCamelCaseToSnakeCase(
  payload: Record<string, string>
): Record<string, string> {
  const formattedPayload: Record<string, string> = {}

  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      formattedPayload[fromCamelCaseToSnakeCase(key)] = value
    }
  }

  return formattedPayload
}

export function formatSubsidiesData(data: any): any[] {
  return data.map((item: any) => ({
    id: item.id,
    title: item.title
  }))
}

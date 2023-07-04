import { translate } from '@/i18n'

export const formatFile = (path = '') => {
  const file = path.split('\\')
  return file[file.length - 1] || translate('form.component.fileInput.chooseFile')
}

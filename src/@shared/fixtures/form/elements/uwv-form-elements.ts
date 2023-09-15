import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export const required = ['uwv']

export const properties = {
  uwv: {
    title: 'Gewaarmerkt verzekeringsbericht',
    ...fileUploadProperties
  }
}

export const elements = [
  {
    type: 'Group',
    label: 'UWV',
    elements: [
      {
        type: 'CustomControl',
        scope: '#/properties/uwv',
        label: 'Gewaarmerkt verzekeringsbericht',
        options: {
          ...fileUploadOptions
        }
      }
    ]
  }
]

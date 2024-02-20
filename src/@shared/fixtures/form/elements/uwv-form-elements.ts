import {
  fileUploadOptions,
  fileUploadProperties
} from '@shared/fixtures/form/elements/file-upload-element'

export const elements = [
  {
    label: 'UWV',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'Gewaarmerkt verzekeringsbericht',
            options: {
              ...fileUploadOptions
            },
            scope: '#/properties/certifiedEmploymentDocument',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  }
]

export const properties = {
  certifiedEmploymentDocument: {
    ...fileUploadProperties,
    title: 'Gewaarmerkt verzekeringsbericht'
  }
}

export const required = ['certifiedEmploymentDocument']

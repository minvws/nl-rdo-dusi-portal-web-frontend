import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export default async () => {
  const properties = {
    lastName: {
      type: 'string'
    },
    file: {
      ...fileUploadProperties
    }
  }

  const uischema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/lastName'
          },
          {
            type: 'CustomControl',
            scope: '#/properties/file',
            label: 'file',
            options: {
              ...fileUploadOptions
            }
          }
        ]
      }
    ]
  }

  return {
    data: [
      {
        uischema,
        dataschema: {
          required: ['lastName', 'file'],
          properties
        },
        title: 'Start'
      }
    ]
  }
}

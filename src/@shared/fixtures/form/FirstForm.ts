import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export default async () => {
  const properties = {
    firstName: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'string',
      format: 'date',
      title: 'Geboortedatum',
      formatMinimum: '2023-10-14',
      formatMaximum: '2023-10-15'
    },
    file: fileUploadProperties
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
            scope: '#/properties/dateOfBirth',
            label: 'Geboortedatum'
          },
          {
            type: 'CustomControl',
            scope: '#/properties/firstName'
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
          required: ['firstName', 'file'],
          properties
        },
        title: 'Start'
      }
    ],
    values: {
      firstName: 'Foo bar'
    }
  }
}

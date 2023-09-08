export default async () => {
  const properties = {
    firstName: {
      type: 'string'
    },
    file: {
      type: 'string',
      file: true
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
            scope: '#/properties/firstName'
          },
          {
            type: 'CustomControl',
            scope: '#/properties/file',
            label: 'file',
            options: {
              accept: 'image/*,.pdf',
              maxFileSize: 20971520,
              tip: 'Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
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
    ]
  }
}

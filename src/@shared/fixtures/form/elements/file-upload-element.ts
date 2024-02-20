export const fileUploadMaxSize = 20971520

export const fileUploadProperties = {
  file: true,
  items: {
    properties: {
      id: {
        type: 'string'
      },
      mimeType: {
        type: 'string'
      },
      name: {
        type: 'string'
      }
    },
    required: ['id'],
    type: 'object'
  },
  maxItems: 20,
  minItems: 1,
  type: 'array'
}

export const fileUploadOptions = {
  accept: 'image/jpeg,image/png,.pdf',
  maxFileSize: 20971520,
  maxItems: 20,
  minItems: 1,
  tip: 'Toegestane bestandstypen: pdf, jpg, jpeg, png. Maximale bestandsgrootte: 20 MB.'
}

export const fileUploadProperties = {
  type: 'array',
  minItems: 2,
  maxItems: 2,
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      mimeType: {
        type: 'string'
      }
    },
    required: ['id']
  },
  file: true
}

export const fileUploadMaxSize = 20971520
export const fileUploadOptions = {
  accept: 'image/*,.pdf',
  maxFileSize: fileUploadMaxSize,
  tip: 'Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
}

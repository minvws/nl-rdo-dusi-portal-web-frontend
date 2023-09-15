import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export const required = ['medicalAssessment', 'longtermCovid']

export const properties = {
  medicalAssessment: {
    title: 'Sociaal-medische beoordeling',
    ...fileUploadProperties
  },
  longtermCovid: {
    type: 'string',
    enum: ['Ja', 'Nee'],
    title: 'Langdurige post-COVID klachten'
  },
  doctorsStatement: {
    title: 'Verklaring arts',
    ...fileUploadProperties
  }
}

export const allOf = [
  {
    if: {
      properties: { longtermCovid: { const: 'Nee' } }
    },
    then: {
      required: ['doctorsStatement']
    }
  }
]

export const elements = [
  {
    type: 'Group',
    label: 'Medisch',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/medicalAssessment',
            label: 'Sociaal-medische beoordeling',
            options: {
              ...fileUploadOptions
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/longtermCovid',
            label: 'Heeft u langdurige post-COVID klachten?',
            options: {
              format: 'radio'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/doctorsStatement',
            label: 'Verklaring arts',
            options: {
              ...fileUploadOptions
            },
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/longtermCovid',
                schema: { const: 'Nee' }
              }
            }
          }
        ]
      }
    ]
  }
]

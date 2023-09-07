export const required = ['medicalAssessment', 'longtermCovid']

export const properties = {
  medicalAssessment: {
    type: 'string',
    file: true,
    title: 'Sociaal-medische beoordeling'
  },
  longtermCovid: {
    type: 'string',
    enum: ['Ja', 'Nee'],
    title: 'Langdurige post-COVID klachten'
  },
  doctorsStatement: {
    type: 'string',
    file: true,
    title: 'Verklaring arts'
  }
}

export const allOf = [
  {
    if: {
      properties: { doctorsStatement: { const: 'Ja' } }
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
              accept: 'image/*,.pdf',
              maxFileSize: 20971520
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
              accept: 'image/*,.pdf',
              maxFileSize: 20971520
            },
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/longtermCovid',
                schema: { const: 'Ja' }
              }
            }
          }
        ]
      }
    ]
  }
]

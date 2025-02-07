import {
  fileUploadOptions,
  fileUploadProperties
} from '@shared/fixtures/form/elements/file-upload-element'

export const allOf = [
  {
    if: {
      properties: {
        hasPostCovidDiagnose: {
          const: 'Nee'
        }
      }
    },
    then: {
      required: ['doctorsCertificate']
    }
  }
]

export const elements = [
  {
    label: 'Medisch',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'Medisch onderzoeksverslag (medische rapportage)',
            options: {
              ...fileUploadOptions
            },
            scope: '#/properties/socialMedicalAssessment',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      },
      {
        elements: [
          {
            label: 'Bevat uw medisch onderzoeksverslag de diagnose langdurige post-COVID?',
            options: {
              format: 'radio'
            },
            scope: '#/properties/hasPostCovidDiagnose',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      },
      {
        elements: [
          {
            label: 'Verklaring arts',
            options: {
              ...fileUploadOptions
            },
            rule: {
              condition: {
                schema: {
                  const: 'Nee'
                },
                scope: '#/properties/hasPostCovidDiagnose'
              },
              effect: 'SHOW'
            },
            scope: '#/properties/doctorsCertificate',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  }
]

export const properties = {
  doctorsCertificate: {
    ...fileUploadProperties,
    title: 'Verklaring arts'
  },
  hasPostCovidDiagnose: {
    enum: ['Ja', 'Nee'],
    title: 'Heeft langdurige post-COVID klachten',
    type: 'string'
  },
  socialMedicalAssessment: {
    ...fileUploadProperties,
    title: 'Medisch onderzoeksverslag'
  }
}

export const required = ['socialMedicalAssessment', 'hasPostCovidDiagnose']

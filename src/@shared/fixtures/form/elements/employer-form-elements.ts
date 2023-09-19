import { allEmploymentFunctions } from '@shared/fixtures/form/data/all-employment-functions'
import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export const required = [
  'employmentContract',
  'employmentFunction',
  'employer',
  'judicialInstitution'
]

export const allOf = [
  {
    if: {
      properties: { employer: { const: 'Andere organisatie' } }
    },
    then: {
      required: ['medicalStatement']
    }
  },
  {
    if: {
      properties: { judicialInstitution: { const: 'Ja' } }
    },
    then: {
      required: ['bigNumber']
    }
  },
  {
    if: {
      properties: { employmentFunction: { const: 'Anders' } }
    },
    then: {
      required: ['otherEmploymentFunction']
    }
  }
]

export const properties = {
  employmentContract: {
    title: 'Arbeidsovereenkomst',
    ...fileUploadProperties
  },
  employmentFunction: {
    type: 'string',
    enum: allEmploymentFunctions,
    title: 'Functie'
  },
  otherEmploymentFunction: {
    type: 'string',
    title: 'Functie'
  },
  employer: {
    type: 'string',
    enum: ['Zorgaanbieder', 'Andere organisatie'],
    title: 'Werkgever'
  },
  medicalStatement: {
    title: 'Zorgaanbiedersverklaring',
    ...fileUploadProperties
  },
  judicialInstitution: {
    type: 'string',
    enum: ['Ja', 'Nee'],
    title: 'Justiele instelling'
  },
  bigNumber: {
    type: 'string',
    title: 'BIG-nummer',
    minLength: 11,
    maxLength: 11
  }
}

export const elements = [
  {
    type: 'Group',
    label: 'Werkgever',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/employmentContract',
            label: 'Arbeidsovereenkomst',
            options: {
              ...fileUploadOptions
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/employmentFunction',
            label: 'Functie',
            options: {
              format: 'select',
              placeholder: 'Selecteer uw functie'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/otherEmploymentFunction',
            label: 'Andere functie',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/employmentFunction',
                schema: { const: 'Anders' }
              }
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/employer',
            label: 'Werkgever',
            options: {
              format: 'radio'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/medicalStatement',
            label: 'Zorgaanbiedersverklaring',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/employer',
                schema: { const: 'Andere organisatie' }
              }
            },
            options: {
              ...fileUploadOptions
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/judicialInstitution',
            label: 'Bent u werkzaam geweest bij een justitiële inrichting?',
            options: {
              format: 'radio'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/bigNumber',
            label: 'BIG-nummer',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/judicialInstitution',
                schema: { const: 'Ja' }
              }
            }
          }
        ]
      }
    ]
  }
]

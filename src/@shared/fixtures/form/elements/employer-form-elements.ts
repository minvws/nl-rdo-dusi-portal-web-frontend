import { allEmploymentFunctions } from '@shared/fixtures/form/data/all-employment-functions'

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
  }
]

export const properties = {
  employmentContract: {
    type: 'string',
    file: true,
    title: 'Arbeidsovereenkomst'
  },
  employmentFunction: {
    type: 'string',
    enum: allEmploymentFunctions,
    title: 'Functie'
  },
  employer: {
    type: 'string',
    enum: ['Zorgaanbieder', 'Andere organisatie'],
    title: 'Werkgever'
  },
  medicalStatement: {
    type: 'string',
    file: true,
    title: 'Zorgaanbiedersverklaring'
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
              accept: 'image/*,.pdf',
              maxFileSize: 5242880
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
              accept: 'image/*,.pdf',
              maxFileSize: 5242880
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

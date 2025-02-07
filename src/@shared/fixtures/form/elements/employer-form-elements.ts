import { allEmploymentFunctions } from '@shared/fixtures/form/data/all-employment-functions'
import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export const required = [
  'employmentContract',
  'employmentFunction',
  'employerKind',
  'hasBeenWorkingAtJudicialInstitution'
]

export const allOf = [
  {
    if: {
      anyOf: [
        {
          properties: {
            employmentFunction: {
              const: 'Anders'
            }
          },
          required: ['employmentFunction']
        },
        {
          properties: {
            employerKind: {
              const: 'Andere organisatie'
            }
          },
          required: ['employerKind']
        }
      ]
    },
    then: {
      required: ['otherEmployerDeclarationFile']
    }
  },
  {
    if: {
      properties: {
        hasBeenWorkingAtJudicialInstitution: {
          const: 'Ja'
        }
      }
    },
    then: {
      required: ['BIGNumberJudicialInstitution']
    }
  },
  {
    if: {
      properties: {
        employmentFunction: {
          const: 'Anders'
        }
      }
    },
    then: {
      required: ['otherEmploymentFunction']
    }
  }
]

export const properties = {
  BIGNumberJudicialInstitution: {
    maxLength: 11,
    title: 'BIG-nummer',
    type: 'string'
  },
  employmentContract: {
    ...fileUploadProperties,
    title: 'Bewijs dienstverband'
  },
  employmentFunction: {
    enum: allEmploymentFunctions,
    title: 'Functie',
    type: 'string'
  },
  hasBeenWorkingAtJudicialInstitution: {
    enum: ['Ja', 'Nee'],
    title: 'Bent u werkzaam geweest bij een justitiële inrichting?',
    type: 'string'
  },
  otherEmployerDeclarationFile: {
    ...fileUploadProperties,
    title: 'Verklaring zorgaanbieder'
  },
  otherEmploymentFunction: {
    maxLength: 300,
    title: 'Andere functie',
    type: 'string'
  },
  employerKind: {
    enum: ['Zorgaanbieder', 'Andere organisatie'],
    title: 'Werkgever',
    type: 'string'
  }
}

export const elements = [
  {
    label: 'Werkgever',
    type: 'Group',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            label: 'Bewijs van uw dienstverband',
            options: {
              ...fileUploadOptions
            },
            scope: '#/properties/employmentContract',
            type: 'CustomControl'
          },
          {
            label: 'Functie',
            options: {
              format: 'select',
              placeholder: '-- Selecteer een functie --'
            },
            scope: '#/properties/employmentFunction',
            type: 'CustomControl'
          },
          {
            label: 'Andere functie',
            options: {
              placeholder: ''
            },
            rule: {
              condition: {
                schema: {
                  const: 'Anders'
                },
                scope: '#/properties/employmentFunction'
              },
              effect: 'SHOW'
            },
            scope: '#/properties/otherEmploymentFunction',
            type: 'CustomControl'
          },
          {
            type: 'VerticalLayout',
            elements: [
              {
                options: {
                  format: 'radio'
                },
                scope: '#/properties/employerKind',
                label: 'Werkgever',
                type: 'CustomControl'
              }
            ]
          },
          {
            type: 'VerticalLayout',
            elements: [
              {
                label: 'Verklaring zorgaanbieder',
                options: {
                  ...fileUploadOptions
                },
                rule: {
                  condition: {
                    schema: {
                      anyOf: [
                        {
                          properties: {
                            employmentFunction: {
                              const: 'Anders'
                            }
                          },
                          required: ['employmentFunction']
                        },
                        {
                          properties: {
                            employerKind: {
                              const: 'Andere organisatie'
                            }
                          },
                          required: ['employerKind']
                        }
                      ]
                    },
                    scope: '#'
                  },
                  effect: 'SHOW'
                },
                scope: '#/properties/otherEmployerDeclarationFile',
                type: 'CustomControl'
              }
            ]
          },
          {
            type: 'VerticalLayout',
            elements: [
              {
                label: 'Heeft u gewerkt in een justitiële inrichting?',
                options: {
                  format: 'radio'
                },
                scope: '#/properties/hasBeenWorkingAtJudicialInstitution',
                type: 'CustomControl'
              }
            ]
          },
          {
            type: 'VerticalLayout',
            elements: [
              {
                label: 'BIG-nummer',
                options: [],
                rule: {
                  condition: {
                    schema: {
                      const: 'Ja'
                    },
                    scope: '#/properties/hasBeenWorkingAtJudicialInstitution'
                  },
                  effect: 'SHOW'
                },
                scope: '#/properties/BIGNumberJudicialInstitution',
                type: 'CustomControl'
              }
            ]
          }
        ]
      }
    ]
  }
]

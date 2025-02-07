export default async () => {
  const properties = {
    bankAccountHolder: {
      type: 'string',
      title: 'Naam rekeninghouder'
    },
    bankAccountNumber: {
      type: 'string',
      iban: true,
      title: 'IBAN'
    },
    backAccountNumberExtraStep: {
      type: 'string',
      title: 'backAccountNumberExtraStep'
    },
    validationResult: {
      type: 'object',
      default: [],
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string'
          },
          id: {
            type: 'string'
          }
        }
      }
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
            type: 'Group',
            label: 'Bank',
            elements: [
              {
                type: 'VerticalLayout',
                elements: [
                  {
                    type: 'CustomControl',
                    scope: '#/properties/bankAccountHolder',
                    label: 'Naam rekeninghouder',
                    options: {
                      validation: ['onBlur']
                    }
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/bankAccountNumber',
                    label: 'IBAN',
                    options: {
                      tip: 'Staat u onder bewind? Vermeld dan het IBAN van uw beheerrekening.',
                      validation: ['onValid']
                    }
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/backAccountNumberExtraStep',
                    label: 'Extra step',
                    options: {
                      tip: 'IBAN validation-results has an error'
                    },
                    rule: {
                      effect: 'SHOW',
                      condition: {
                        scope: '#/properties/validationResult',
                        schema: {
                          contains: {
                            type: 'object',
                            properties: {
                              id: {
                                enum: ['bankAccountNumber']
                              },
                              type: {
                                enum: ['error']
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              }
            ]
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
          required: ['bankAccountHolder', 'bankAccountNumber'],
          properties,
          allOf: [
            {
              if: {
                properties: {
                  validationResult: {
                    contains: {
                      type: 'object',
                      properties: {
                        id: {
                          enum: ['bankAccountNumber']
                        },
                        type: {
                          enum: ['error']
                        }
                      }
                    }
                  }
                }
              },
              then: {
                required: ['backAccountNumberExtraStep']
              }
            }
          ]
        },
        title: 'Start'
      }
    ]
  }
}

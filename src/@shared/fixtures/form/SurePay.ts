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
          properties
        },
        title: 'Start'
      }
    ]
  }
}

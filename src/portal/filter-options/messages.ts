export default [
  {
    uischema: {
      type: 'FormGroupControl',
      options: { section: true, group: true },
      elements: [
        {
          type: 'Group',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'CustomControl',
                  scope: '#/properties/title'
                },
                {
                  type: 'FormGroupControl',
                  label: 'Datum',
                  elements: [
                    {
                      type: 'CustomControl',
                      scope: '#/properties/dateFrom',
                      options: {
                        inline: true
                      }
                    },
                    {
                      type: 'CustomControl',
                      scope: '#/properties/dateTo',
                      options: {
                        inline: true
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    schema: {
      properties: {
        caseNumber: {
          type: 'string',
          title: 'title'
        },
        dateFrom: {
          type: 'string',
          format: 'date',
          title: 'Van'
        },
        dateTo: {
          type: 'string',
          format: 'date',
          title: 'Tot'
        }
      }
    }
  }
]

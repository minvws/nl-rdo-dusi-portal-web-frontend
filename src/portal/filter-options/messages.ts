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
                  scope: '#/properties/search'
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
                },
                {
                  type: 'CustomControl',
                  scope: '#/properties/assessment',
                  options: {
                    format: 'checkbox-group'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    schema: {
      properties: {
        search: {
          type: 'string',
          title: 'Zoeken'
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
        },
        assessment: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['BTV', 'DAMU', 'Post Covid']
          },
          title: 'Regeling'
        }
      }
    }
  }
]

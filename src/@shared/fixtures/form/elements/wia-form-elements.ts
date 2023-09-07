export const required = ['wia']

export const properties = {
  wia: {
    type: 'string',
    title: 'WIA',
    enum: ['Ja', 'Nee']
  },
  wiaJudgement: {
    type: 'string',
    file: true,
    title: 'WIA-Beslissing'
  }
}

export const allOf = [
  {
    if: {
      properties: { wia: { const: 'Nee' } }
    },
    then: {
      required: ['wiaJudgement']
    }
  }
]

export const elements = [
  {
    type: 'Group',
    label: 'WIA',
    elements: [
      {
        type: 'CustomControl',
        scope: '#/properties/wia',
        label:
          'Is uw WIA-beslissing uitgesteld vanwege een (vrijwillige of verplichte) loondoorbetaling?',
        options: {
          format: 'radio'
        }
      },
      {
        type: 'CustomControl',
        scope: '#/properties/wiaJudgement',
        label: 'WIA-Beslissing',
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/wia',
            schema: { const: 'Nee' }
          }
        },
        options: {
          accept: 'image/*,.pdf',
          maxFileSize: 20971520
        }
      }
    ]
  }
]

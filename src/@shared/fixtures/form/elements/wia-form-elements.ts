import {
  fileUploadOptions,
  fileUploadProperties
} from '@shared/fixtures/form/elements/file-upload-element'

export const allOf = [
  {
    if: {
      properties: {
        isWiaDecisionPostponed: {
          const: 'Ja'
        }
      }
    },
    then: {
      required: ['wiaDecisionPostponedLetter']
    }
  }
]

export const elements = [
  {
    label: 'WIA',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'WIA-Beslissing',
            options: {
              ...fileUploadOptions
            },
            scope: '#/properties/wiaDecisionDocument',
            type: 'CustomControl'
          },
          {
            label:
              'Is uw WIA-beslissing uitgesteld vanwege een (vrijwillige of verplichte) loondoorbetaling?',
            options: {
              format: 'radio'
            },
            scope: '#/properties/isWiaDecisionPostponed',
            type: 'CustomControl'
          },
          {
            label: 'Toekenningsbrief',
            options: {
              ...fileUploadOptions
            },
            rule: {
              condition: {
                schema: {
                  const: 'Ja'
                },
                scope: '#/properties/isWiaDecisionPostponed'
              },
              effect: 'SHOW'
            },
            scope: '#/properties/wiaDecisionPostponedLetter',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  }
]

export const properties = {
  isWiaDecisionPostponed: {
    enum: ['Ja', 'Nee'],
    title: 'Is WIA beslissing uitgesteld?',
    type: 'string'
  },
  wiaDecisionDocument: {
    title: 'WIA-Beslissing',
    ...fileUploadProperties
  },
  wiaDecisionPostponedLetter: {
    title: 'Toekenningsbrief',
    ...fileUploadProperties
  }
}

export const required = ['wiaDecisionDocument', 'isWiaDecisionPostponed']

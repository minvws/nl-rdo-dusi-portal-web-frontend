export const required = ['wia']
import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export const properties = {
  wia: {
    type: 'string',
    title: 'WIA',
    enum: ['Ja', 'Nee']
  },
  wiaJudgement: {
    title: 'WIA-Beslissing',
    ...fileUploadProperties
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
          ...fileUploadOptions
        }
      }
    ]
  }
]

import { placeholder } from '@shared/fixtures/form/data/placeholder'

export const required = ['bsn']

export const properties = {
  bsn: {
    type: 'string',
    title: 'BSN',
    default: 'BSN here'
  }
}

export const elements = [
  {
    type: 'CustomControl',
    scope: '#/properties/bsn',
    label: 'BSN',
    options: {
      readonly: true,
      placeholder
    }
  }
]

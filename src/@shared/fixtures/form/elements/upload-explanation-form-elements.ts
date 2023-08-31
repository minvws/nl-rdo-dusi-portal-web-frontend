import { external } from '@shared/external-links'

export const required = []

export const properties = {}

export const elements = [
  {
    type: 'Group',
    elements: [
      {
        type: 'FormNotification',
        options: {
          displayAs: 'explanation',
          message: `Upload maximaal 1 bijlage per invoerveld met een maximale bestandsgrootte van 5 MB. Toegestane bestandstypes zijn:  PDF, PNG, JPG, JPEG. Voor meer informatie zie: <a href="https://loremipsum.dusi.nl" rel="${external}">loremipsum.dusi.nl</a>.`
        }
      }
    ]
  }
]

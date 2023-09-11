import { urls, external } from '@shared/external-links'

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
          message: `Upload maximaal 1 bijlage per invoerveld met een maximale bestandsgrootte van 20 MB. Toegestane bestandstypes zijn:  PDF, PNG, JPG, JPEG. <br/><br/>Voor verdere toelichting informatie zie: <a href="${
            urls.attachments
          }" rel="${external}">${urls.attachments.split('//')[1]}</a>.`
        }
      }
    ]
  }
]

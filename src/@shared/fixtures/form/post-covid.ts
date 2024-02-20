import {
  elements as employerElements,
  properties as employerProperties,
  required as employerRequired,
  allOf as employerAllOf
} from '@shared/fixtures/form/elements/employer-form-elements'

import {
  elements as medicalElements,
  properties as medicalProperties,
  required as medicalRequired,
  allOf as medicalAllOf
} from '@shared/fixtures/form/elements/medical-form-elements'

import {
  elements as personalInformationElements,
  properties as personalInformationProperties,
  required as personalInformationRequired
} from '@shared/fixtures/form/elements/personal-form-elements'

import {
  elements as resultsElements,
  properties as resultsProperties,
  required as resultsRequired
} from '@shared/fixtures/form/elements/results-form-elements'

import {
  elements as truthStatementElements,
  properties as truthStatementProperties,
  required as truthStatementRequired
} from '@shared/fixtures/form/elements/truth-statement-form-elements'

import {
  elements as uwvElements,
  properties as uwvProperties,
  required as uwvRequired
} from '@shared/fixtures/form/elements/uwv-form-elements'

import {
  elements as wiaElements,
  properties as wiaProperties,
  required as wiaRequired,
  allOf as wiaAllOf
} from '@shared/fixtures/form/elements/wia-form-elements'

export default async () => {
  const postCovidIntro = await Object.values(
    import.meta.glob('@shared/fixtures/form/data/post-covid.html', {
      as: 'raw'
    })
  )[0]()

  const introductionSchema = {
    elements: [
      {
        options: {
          html: postCovidIntro
        },
        type: 'FormHtml'
      }
    ],
    options: { section: true },
    type: 'FormGroupControl'
  }

  const personalInformationSchema = {
    elements: personalInformationElements,
    options: { section: true },
    type: 'FormGroupControl'
  }

  const documentSchema = {
    elements: [...uwvElements, ...wiaElements, ...employerElements, ...medicalElements],
    options: { section: true },
    type: 'FormGroupControl'
  }

  const reviewSchema = {
    elements: [...resultsElements, ...truthStatementElements],
    options: { section: true },
    type: 'FormGroupControl'
  }

  return {
    data: [
      {
        dataschema: {},
        title: 'Start',
        uischema: introductionSchema
      },
      {
        dataschema: {
          properties: personalInformationProperties,
          required: personalInformationRequired
        },
        title: 'Persoonsgegevens toevoegen',
        uischema: personalInformationSchema
      },
      {
        dataschema: {
          allOf: [...wiaAllOf, ...employerAllOf, ...medicalAllOf],
          properties: {
            ...uwvProperties,
            ...wiaProperties,
            ...employerProperties,
            ...medicalProperties
          },
          required: [...uwvRequired, ...wiaRequired, ...employerRequired, ...medicalRequired]
        },
        title: 'Documenten toevoegen',
        uischema: documentSchema
      },
      {
        dataschema: {
          properties: {
            ...resultsProperties,
            ...truthStatementProperties
          },
          required: [...resultsRequired, ...truthStatementRequired]
        },
        title: 'Controleren en ondertekenen',
        uischema: reviewSchema
      }
    ],
    title: 'Aanvraagformulier subsidieregeling postcovid'
  }
}

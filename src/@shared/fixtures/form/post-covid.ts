import {
  properties as personalInformationProperties,
  elements as personalInformationElements,
  required as personalInformationRequired
} from '@shared/fixtures/form/elements/personal-form-elements'

import {
  properties as uploadExplanationProperties,
  elements as uploadExplanationElements,
  required as uploadExplanationRequired
} from '@shared/fixtures/form/elements/upload-explanation-form-elements'

import {
  properties as uwvProperties,
  elements as uwvElements,
  required as uwvRequired
} from '@shared/fixtures/form/elements/uwv-form-elements'

import {
  properties as wiaProperties,
  elements as wiaElements,
  required as wiaRequired,
  allOf as wiaAllOf
} from '@shared/fixtures/form/elements/wia-form-elements'

import {
  properties as employerProperties,
  elements as employerElements,
  required as employerRequired,
  allOf as employerAllOf
} from '@shared/fixtures/form/elements/employer-form-elements'

import {
  properties as medicalProperties,
  elements as medicalElements,
  required as medicalRequired,
  allOf as medicalAllOf
} from '@shared/fixtures/form/elements/medical-form-elements'

import {
  properties as submitExplanationProperties,
  elements as submitExplanationElements,
  required as submitExplanationRequired
} from '@shared/fixtures/form/elements/submit-explanation-form-elements'

import {
  properties as truthStatementProperties,
  elements as truthStatementElements,
  required as truthStatementRequired
} from '@shared/fixtures/form/elements/truth-statement-form-elements'

export default async () => {
  const postCovidIntro = await Object.values(
    import.meta.glob('@shared/fixtures/form/data/post-covid.html', {
      as: 'raw'
    })
  )[0]()

  const introductionSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'Group',
        elements: [
          {
            type: 'FormNotification',
            options: {
              displayAs: 'warning',
              message:
                'Deze subsidie kan niet worden aangevraagd voor de behandelmethode autologe vettransplantatie (AFT), ook wel bekend als lipofilling. Deze behandeling is (bij de constructie of reconstructie van een volledige borst) niet bewezen effectief.'
            }
          }
        ]
      },
      {
        type: 'FormHtml',
        options: {
          html: postCovidIntro
        }
      }
    ]
  }

  const personalInformationSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: personalInformationElements
  }

  const documentSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      ...uploadExplanationElements,
      ...uwvElements,
      ...wiaElements,
      ...employerElements,
      ...medicalElements
    ]
  }

  const reviewSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      ...submitExplanationElements,
      {
        type: 'Group',
        label: 'Controleren',
        elements: [
          {
            type: 'FormResultsTable',
            label: 'Uw gegevens',
            options: {
              fields: {
                Naam: '{firstName} {nameInfix} {lastName}',
                Adres: '{streetName} {houseNumber}{houseNumberSuffix}<br/>{postalCode} {city}',
                Geboortedatum: '{dateOfBirth}',
                Telefoon: '{phoneNumber}',
                'E-mailadress': '{email}'
              }
            }
          }
        ]
      },
      ...truthStatementElements
    ]
  }

  return {
    title: 'Aanvraagformulier subsidieregeling postcovid',
    data: [
      {
        uischema: introductionSchema,
        dataschema: {}
      },
      {
        title: 'Persoonsgegevens toevoegen',
        uischema: personalInformationSchema,
        dataschema: {
          properties: personalInformationProperties,
          required: personalInformationRequired
        }
      },
      {
        title: 'Documenten toevoegen',
        uischema: documentSchema,
        dataschema: {
          properties: {
            ...uploadExplanationProperties,
            ...uwvProperties,
            ...wiaProperties,
            ...employerProperties,
            ...medicalProperties
          },
          required: [
            ...uploadExplanationRequired,
            ...uwvRequired,
            ...wiaRequired,
            ...employerRequired,
            ...medicalRequired
          ],
          allOf: [...wiaAllOf, ...employerAllOf, ...medicalAllOf]
        }
      },
      {
        title: 'Controleren en ondertekenen',
        uischema: reviewSchema,
        dataschema: {
          properties: {
            ...submitExplanationProperties,
            ...truthStatementProperties
          },
          required: [...submitExplanationRequired, ...truthStatementRequired]
        }
      }
    ]
    /*
      example of setting initial values
      values: {
        firstName: 'Foo bar'
      }
    */
  }
}

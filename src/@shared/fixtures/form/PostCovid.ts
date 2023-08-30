import { mergeElements } from '@shared/fixtures/form/utils/form-merge-elements'

import {
  properties as bsnProperties,
  elements as bsnElements,
  required as bsnRequired
} from '@shared/fixtures/form/elements/bsn-form-elements'

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
  anyOf as wiaAnyOf
} from '@shared/fixtures/form/elements/wia-form-elements'

import {
  properties as employerProperties,
  elements as employerElements,
  required as employerRequired,
  anyOf as employerAnyOf
} from '@shared/fixtures/form/elements/employer-form-elements'

import {
  properties as medicalProperties,
  elements as medicalElements,
  required as medicalRequired,
  anyOf as medicalAnyOf
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
  const properties = {
    ...bsnProperties,
    ...personalInformationProperties,
    ...uploadExplanationProperties,
    ...uwvProperties,
    ...wiaProperties,
    ...employerProperties,
    ...medicalProperties,
    ...submitExplanationProperties,
    ...truthStatementProperties
  }

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
          html: '<h1>Introductie</h1><p style="color:red">Komt nog. Uitleg over regeling, voorwaarden, documenten die nodig zijn. Nog op te stellen.</p>'
        }
      }
    ]
  }

  const personalInformationSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: mergeElements(personalInformationElements, bsnElements, '0.elements.0.elements.0')
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
                'Burgerservicenummer (BSN)': '{bsn}',
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
        dataschema: {
          properties
        }
      },
      {
        title: 'Persoonsgegevens toevoegen',
        uischema: personalInformationSchema,
        dataschema: {
          properties,
          required: [...personalInformationRequired, ...bsnRequired]
        }
      },
      {
        title: 'Documenten toevoegen',
        uischema: documentSchema,
        dataschema: {
          properties,
          required: [
            ...uploadExplanationRequired,
            ...uwvRequired,
            ...wiaRequired,
            ...employerRequired,
            ...medicalRequired
          ],
          anyOf: [...wiaAnyOf, ...employerAnyOf, ...medicalAnyOf]
        }
      },
      {
        title: 'Controleren en ondertekenen',
        uischema: reviewSchema,
        dataschema: {
          properties,
          required: [...submitExplanationRequired, ...truthStatementRequired]
        }
      }
    ]
  }
}

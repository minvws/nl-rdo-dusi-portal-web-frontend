import { placeholder } from '@shared/fixtures/form/data/placeholder'
import allCountries from '@/@shared/fixtures/form/data/all-countries'

export const required = [
  'firstName',
  'lastName',
  'streetName',
  'houseNumber',
  'postalCode',
  'city',
  'country',
  'phoneNumber',
  'email',
  'dateOfBirth',
  'bankAccountHolder',
  'bankAccountNumber'
]

export const properties = {
  firstName: {
    type: 'string',
    title: 'Voornaam'
  },
  nameInfix: {
    type: 'string',
    title: 'Tussenvoegsel'
  },
  lastName: {
    type: 'string',
    title: 'Achternaam'
  },
  dateOfBirth: {
    type: 'string',
    format: 'date',
    title: 'Geboortedatum'
  },
  streetName: {
    type: 'string',
    title: 'Straatnaam'
  },
  houseNumber: {
    type: 'integer',
    title: 'Huisnummer',
    minimum: 1
  },
  houseNumberSuffix: {
    type: 'string',
    title: 'Huisnummer toevoeging'
  },
  postalCode: {
    type: 'string',
    title: 'Postcode',
    postalCode: true,
    maxLength: 7
  },
  city: {
    type: 'string',
    title: 'Plaatsnaam'
  },
  country: {
    type: 'string',
    enum: allCountries,
    title: 'Land',
    default: 'Nederland'
  },
  phoneNumber: {
    type: 'string',
    tel: true,
    title: 'Telefoonnummer',
    maxLength: 16
  },
  email: {
    type: 'string',
    format: 'email',
    title: 'E-mailadres'
  },
  bankAccountHolder: {
    type: 'string',
    title: 'Naam rekeninghouder'
  },
  bankAccountNumber: {
    type: 'string',
    iban: true,
    title: 'IBAN'
  }
}

export const elements = [
  {
    type: 'Group',
    label: 'Persoonlijke informatie',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/firstName',
            label: 'Voornaam',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/nameInfix',
            label: 'Tussenvoegsel',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/lastName',
            label: 'Achternaam',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/dateOfBirth',
            label: 'Geboortedatum',
            options: {
              placeholder
            }
          }
        ]
      }
    ]
  },
  {
    type: 'Group',
    label: 'Adres',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/streetName',
            label: 'Straatnaam',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/houseNumber',
            label: 'Huisnummer',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/houseNumberSuffix',
            label: 'Huisnummer toevoeging',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/postalCode',
            label: 'Postcode',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/city',
            label: 'Plaatsnaam',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/country',
            label: 'Land',
            options: {
              format: 'select',
              placeholder: 'Selecteer een land'
            }
          }
        ]
      }
    ]
  },
  {
    type: 'Group',
    label: 'Contact',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/phoneNumber',
            label: 'Telefoonnummer',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/email',
            label: 'E-mailadres',
            options: {
              placeholder,
              tip: 'U wordt via dit e-mailadres geïnformeerd over de status van uw aanvraag. Geef daarom alleen uw eigen e-mailadres door.'
            }
          }
        ]
      }
    ]
  },
  {
    type: 'Group',
    label: 'Bank',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/bankAccountHolder',
            label: 'Naam rekeninghouder',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/bankAccountNumber',
            label: 'IBAN',
            options: {
              placeholder,
              tip: 'Staat u onder bewind? Vermeld dan het IBAN van uw beheerrekening.'
            }
          }
        ]
      }
    ]
  }
]

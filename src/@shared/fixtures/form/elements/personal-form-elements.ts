import allCountries from '@shared/fixtures/form/data/all-countries'
import { placeholder } from '@shared/fixtures/form/data/placeholder'

export const elements = [
  {
    label: 'Adres',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'Huisnummer',
            options: {
              placeholder
            },
            scope: '#/properties/houseNumber',
            type: 'CustomControl'
          },
          {
            label: 'Huisnummer toevoeging',
            options: {
              placeholder
            },
            scope: '#/properties/houseNumberSuffix',
            type: 'CustomControl'
          },
          {
            label: 'Land',
            options: {
              default: 'Nederland',
              format: 'select',
              placeholder: 'Selecteer een land'
            },
            scope: '#/properties/country',
            type: 'CustomControl'
          },
          {
            label: 'Plaatsnaam',
            options: {
              placeholder
            },
            scope: '#/properties/city',
            type: 'CustomControl'
          },
          {
            label: 'Postcode',
            options: {
              placeholder
            },
            scope: '#/properties/postalCode',
            type: 'CustomControl'
          },
          {
            label: 'Straatnaam',
            options: {
              placeholder
            },
            scope: '#/properties/street',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  },
  {
    label: 'Bank',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'IBAN',
            options: {
              placeholder,
              tip: 'Staat u onder bewind? Vermeld dan het IBAN van uw beheerrekening.',
              validation: ['onValid']
            },
            scope: '#/properties/bankAccountNumber',
            type: 'CustomControl'
          },
          {
            label: 'Naam rekeninghouder',
            options: {
              placeholder,
              validation: ['onBlur']
            },
            scope: '#/properties/bankAccountHolder',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  },
  {
    label: 'Contact',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'E-mailadres',
            options: {
              maxLength: 300,
              placeholder,
              tip: 'U wordt via dit e-mailadres geïnformeerd over de status van uw aanvraag. Geef daarom alleen uw eigen e-mailadres door.',
              validation: ['onBlur']
            },
            scope: '#/properties/email',
            type: 'CustomControl'
          },
          {
            label: 'Telefoonnummer',
            options: {
              maxLength: 20,
              placeholder
            },
            scope: '#/properties/phoneNumber',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  },
  {
    label: 'Persoonlijke informatie',
    type: 'Group',
    elements: [
      {
        elements: [
          {
            label: 'Achternaam',
            options: {
              placeholder
            },
            scope: '#/properties/lastName',
            type: 'CustomControl'
          },
          {
            label: 'Geboortedatum',
            options: {
              placeholder
            },
            scope: '#/properties/dateOfBirth',
            type: 'CustomControl'
          },
          {
            label: 'Tussenvoegsel',
            options: {
              placeholder
            },
            scope: '#/properties/infix',
            type: 'CustomControl'
          },
          {
            label: 'Voornaam',
            options: {
              placeholder
            },
            scope: '#/properties/firstName',
            type: 'CustomControl'
          }
        ],
        type: 'VerticalLayout'
      }
    ]
  }
]

export const properties = {
  bankAccountHolder: {
    maxLength: 50,
    title: 'Naam rekeninghouder',
    type: 'string'
  },
  bankAccountNumber: {
    iban: true,
    title: 'IBAN',
    type: 'string'
  },
  city: {
    maxLength: 100,
    title: 'Plaatsnaam',
    type: 'string'
  },
  country: {
    default: 'Nederland',
    enum: allCountries,
    title: 'Land',
    type: 'string'
  },
  dateOfBirth: {
    format: 'date',
    title: 'Geboortedatum',
    type: 'string'
  },
  email: {
    format: 'email',
    maxLength: 300,
    title: 'E-mailadres',
    type: 'string'
  },
  firstName: {
    title: 'Voornaam',
    type: 'string'
  },
  houseNumber: {
    minimum: 0,
    title: 'Huisnummer',
    type: 'integer'
  },
  houseNumberSuffix: {
    maxLength: 10,
    title: 'Huisnummer toevoeging',
    type: 'string'
  },
  infix: {
    title: 'Tussenvoegsel',
    type: 'string'
  },
  lastName: {
    title: 'Achternaam',
    type: 'string'
  },
  phoneNumber: {
    maxLength: 20,
    tel: true,
    title: 'Telefoonnummer',
    type: 'string'
  },
  postalCode: {
    title: 'Postcode',
    type: 'string'
  },
  street: {
    title: 'Straatnaam',
    type: 'string'
  }
}

export const required = [
  'firstName',
  'lastName',
  'street',
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

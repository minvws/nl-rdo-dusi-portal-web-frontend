export const elements = [
  {
    label: 'Controleren',
    type: 'Group',
    elements: [
      {
        label: 'Uw gegevens',
        options: {
          fields: {
            Adres: '{street} {houseNumber}{houseNumberSuffix} {postalCode} {city}',
            'E-mailadres': '{email}',
            Geboortedatum: '{dateOfBirth}',
            Naam: '{firstName} {infix} {lastName}',
            Telefoon: '{phoneNumber}'
          }
        },
        type: 'FormResultsTable'
      }
    ]
  }
]

export const properties = {}

export const required = []

export default async () => {
  const properties = {
    firstName: {
      type: 'string',
      default: 'Jan'
    },
    nameInfix: {
      type: 'string',
      default: 'de'
    },
    lastName: {
      type: 'string',
      default: 'Hoop'
    }
  }

  const uischema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'Group',
        label: 'Persoonlijke informatie',
        elements: [
          {
            type: 'FormResultsTable',
            options: {
              fields: {
                Voornaam: '{firstName}',
                Tussenvoegsel: '{nameInfix}',
                Achternaam: '{lastName}'
              }
            }
          }
        ]
      }
    ]
  }

  return [
    {
      uischema,
      dataschema: {
        properties
      }
    }
  ]
}

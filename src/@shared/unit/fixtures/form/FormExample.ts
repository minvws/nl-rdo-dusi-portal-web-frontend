export default async () => {
  const placeholder = 'Lorem ipsum dolor set'
  const fromExamplePage1 = await Object.values(
    import.meta.glob('./FormExamplePage1.html', { as: 'raw' })
  )[0]()

  const properties = {
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
    dayOfBirth: {
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
      enum: ['Country 1', 'Country 2'],
      title: 'Land'
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
    },
    bankStatement: {
      type: 'string',
      file: true,
      title: 'Kopie bankafschrift'
    },
    extractPersonalRecordsDatabase: {
      type: 'string',
      file: true,
      title: 'Uittreksel bevolkingsregister'
    },
    proofOfMedicalTreatment: {
      type: 'string',
      file: true,
      title: 'Verklaring behandeltraject'
    },
    proofOfTypeOfMedicalTreatment: {
      type: 'string',
      file: true,
      title: 'Verklaring type behandeling'
    },
    permissionToProcessPersonalData: {
      type: 'boolean',
      const: true,
      title: 'Verwerking'
    },
    truth: {
      type: 'boolean',
      const: true,
      title: 'Inhoud'
    }
  }

  const firstSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'FormHtml',
        options: {
          html: fromExamplePage1
        }
      },
      {
        type: 'FormGroupControl',
        label: 'Toestemming',
        options: {
          section: true,
          group: true
        },
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/permissionToProcessPersonalData',
            label: 'Verwerking',
            options: {
              description:
                'Ik geef toestemming voor het verwerken van mijn persoonsgegevens voor deze subsidieaanvraag.'
            }
          }
        ]
      }
    ]
  }

  const secondSchema = {
    type: 'FormGroupControl',
    options: {
      section: true
    },
    elements: [
      {
        type: 'Group',
        elements: [
          {
            type: 'FormNotification',
            options: {
              displayAs: 'explanation',
              message: 'U moet ouder zijn dan 18 jaar (artikel 4 van de regeling).'
            }
          }
        ]
      },
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
                scope: '#/properties/dayOfBirth',
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
                  placeholder
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
  }

  const thirdSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'Group',
        label: 'Bankafschrift of bankpas',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'FormResultsTable',
                label: 'Uw bankgegegvens',
                options: {
                  fields: {
                    'Naam rekeninghouder': '{bankAccountHolder}',
                    IBAN: '{bankAccountNumber}'
                  }
                }
              },
              {
                type: 'CustomControl',
                scope: '#/properties/bankStatement',
                label: 'Kopie bankafschrift',
                options: {
                  accept: 'image/*,.pdf',
                  maxFileSize: 5242880,
                  tip: 'Op de kopie van een recent bankafschrift moeten het rekeningnummer en uw naam zichtbaar zijn. Adres en datum mogen ook, maar zijn niet verplicht. Maak de andere gegevens onleesbaar. U mag ook een afdruk van internet bankieren gebruiken of een kopie van uw bankpas. Zie ook dit <a title="voorbeeld" href="#" target="_blank" rel="noopener" class="external">voorbeeld</a>. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 5 MB.'
                }
              }
            ]
          }
        ]
      },
      {
        type: 'Group',
        label: 'Uittreksel bevolkingsregister',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'CustomControl',
                scope: '#/properties/extractPersonalRecordsDatabase',
                label: 'Uittreksel bevolkingsregister',
                options: {
                  accept: 'image/*,.pdf',
                  maxFileSize: 5242880,
                  tip: 'U kunt een uittreksel uit het bevolkingsregister (de Basisregistratie personen) opvragen bij de gemeente waar u staat ingeschreven. Dit document bevat uw naam, geboortedatum en adres. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 5 MB.'
                }
              }
            ]
          }
        ]
      },
      {
        type: 'Group',
        label: 'Medische verklaring behandeltraject',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'CustomControl',
                scope: '#/properties/proofOfMedicalTreatment',
                label: 'Verklaring behandeltraject',
                options: {
                  accept: 'image/*,.pdf',
                  maxFileSize: 5242880,
                  tip: 'De <a title="medische verklaring over het behandeltraject" href="#" target="_blank" rel="noopener" class="external">medische verklaring over het behandeltraject</a> dat u tot nu toe heeft gevolgd moet zijn ingevuld door de BIG-geregistreerde arts waar u in behandeling bent. Dit kan een huisarts of medisch specialist zijn die de hormonen voorschrijft en de behandeling begeleidt. De verklaring mag niet ouder zijn dan twee maanden. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 5 MB.'
                }
              }
            ]
          }
        ]
      },
      {
        type: 'Group',
        label: 'Medische erklaring van het type behandeling',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'CustomControl',
                scope: '#/properties/proofOfTypeOfMedicalTreatment',
                label: 'Verklaring type behandeling',
                options: {
                  accept: 'image/*,.pdf',
                  maxFileSize: 5242880,
                  tip: 'De <a title="medische verklaring van het type behandeling" href="#" target="_blank" rel="noopener" class="external">medische verklaring van het type behandeling</a> (operatie) dat zal worden uitgevoerd moet zijn ingevuld en ondertekend door een BIG-geregistreerde arts. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 5 MB.'
                }
              }
            ]
          }
        ]
      }
    ]
  }

  const lastSchema = {
    type: 'FormGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'Group',
        label: 'Controleren',
        elements: [
          {
            type: 'FormResultsTable',
            label: 'Uw bankgegevens',
            options: {
              fields: {
                Indiener: '{firstName} {infix} {lastName}',
                Adres: '{streetName} {houseNumber}{houseNumberSuffix} {postalCode} {city}',
                Telefoon: '{phoneNumber}',
                'E-mailadress': '{email}'
              }
            }
          }
        ]
      },
      {
        type: 'Group',
        label: 'Ondertekenen',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/truth',
            label: 'Inhoud',
            options: {
              description: 'Ik verklaar het formulier naar waarheid te hebben ingevuld.'
            }
          }
        ]
      }
    ]
  }

  return [
    {
      uischema: firstSchema,
      schema: {
        properties,
        required: ['permissionToProcessPersonalData']
      }
    },
    {
      uischema: secondSchema,
      schema: {
        required: [
          'firstName',
          'lastName',
          'streetName',
          'houseNumber',
          'postalCode',
          'city',
          'country',
          'phoneNumber',
          'email',
          'dayOfBirth',
          'bankAccountHolder',
          'bankAccountNumber'
        ],
        properties
      },
      title: 'Persoonsgegevens toevoegen'
    },
    {
      uischema: thirdSchema,
      schema: {
        required: [
          'bankStatement',
          'extractPersonalRecordsDatabase',
          'proofOfMedicalTreatment',
          'proofOfTypeOfMedicalTreatment'
        ],
        properties
      },
      title: 'Documenten toevoegen'
    },
    {
      uischema: lastSchema,
      schema: {
        required: ['truth'],
        properties
      },
      title: 'Controleren en ondertekenen'
    }
  ]
}

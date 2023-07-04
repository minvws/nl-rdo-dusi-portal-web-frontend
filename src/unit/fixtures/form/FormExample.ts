export default async () => {
  const placeholder = 'Lorem ipsum dolor set'
  const fromExamplePage1 = await Object.values(
    import.meta.glob('./FormExamplePage1.html', { as: 'raw' })
  )[0]()

  const properties = {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    streetName: {
      type: 'string'
    },
    houseNumber: {
      type: 'string'
    },
    zipCode: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string',
      tel: true
    },
    email: {
      type: 'string',
      format: 'email'
    },
    emailConfirm: {
      type: 'string',
      format: 'email',
      const: {
        $data: '1/email'
      }
    },
    dayOfBirth: {
      type: 'string',
      format: 'date'
    },
    accountHolderName: {
      type: 'string'
    },
    iban: {
      type: 'string',
      iban: true
    },
    bankStatement: {
      type: 'string',
      file: true
    },
    extractPopulationRegister: {
      type: 'string',
      file: true
    },
    medicalCertificateTreatmentProcess: {
      type: 'string',
      file: true
    },
    medicalCertificateTreatmentType: {
      type: 'string',
      file: true
    },
    signed: {
      type: 'boolean',
      const: true
    }
  }

  const firstSchema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'FormHtml',
        options: {
          html: fromExamplePage1
        }
      }
    ]
  }

  const secondSchema = {
    type: 'CustomGroupControl',
    options: { section: true },
    label: 'contactInformation.section',
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'CustomControl',
            scope: '#/properties/firstName',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/lastName',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/streetName',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/houseNumber',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/zipCode',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/city',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/phoneNumber',
            options: {
              placeholder
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/email',
            options: {
              placeholder,
              tip: 'form.fields.email.tip'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/dayOfBirth',
            options: {
              placeholder
            }
          }
        ]
      },
      {
        type: 'Group',
        label: 'iban.section',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'CustomControl',
                scope: '#/properties/accountHolderName',
                options: {
                  placeholder
                }
              },
              {
                type: 'CustomControl',
                scope: '#/properties/iban',
                options: {
                  placeholder,
                  tip: 'form.fields.iban.tip'
                }
              }
            ]
          }
        ]
      }
    ]
  }

  const thirdSchema = {
    type: 'CustomGroupControl',
    options: { section: true },
    elements: [
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Controleren</h5><p>Controleer hieronder uw gegevens.</p>'
            }
          },
          {
            type: 'FormResultsTable',
            options: {
              fields: ['fullName', 'address', 'phoneNumber', 'email', 'dayOfBirth']
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Uploaden documenten</h3><p>Hieronder kunt u het uittreksel van het bevolkingsregister, de verklaringen van de arts (volgens de formats) en een scan/foto van een bankafschrift of een bankpas uploaden.</p>'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/bankStatement',
            options: {
              description: 'form.component.fileInput.description',
              accept: 'image/*'
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Bankafschrift of bankpas</h3><p>Op de kopie van een recent bankafschrift moeten het rekeningnummer en uw naam zichtbaar zijn. Adres en datum mogen ook, maar zijn niet verplicht. Maak de andere gegevens onleesbaar. U mag ook een afdruk van internet bankieren gebruiken of een kopie van uw bankpas. Zie ook dit <a title="Voorbeeld bankafschrift op dus-i.nl " href="https://www.dus-i.nl/documenten/publicaties/2018/07/30/voorbeeld-bankafschrift" target="_blank" rel="noopener" class="external">voorbeeld</a>.</p>'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/extractPopulationRegister',
            options: {
              description: 'form.component.fileInput.description',
              accept: 'image/*'
            }
          },
          {
            type: 'FormResultsTable',
            options: {
              fields: ['accountHolderName', 'iban']
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Uittreksel bevolkingsregister</h3><p>U kunt een uittreksel uit het bevolkingsregister (de Basisregistratie personen) opvragen bij de gemeente waar u staat ingeschreven. Dit document bevat uw naam, geboortedatum en adres.</p>'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/medicalCertificateTreatmentProcess',
            options: {
              description: 'form.component.fileInput.description',
              accept: 'image/*'
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Medische verklaring behandeltraject</h3><p>De <a title="Format verklaring arts op dus-i.nl " href="https://www.dus-i.nl/documenten/publicaties/2019/01/14/verklaring-behandelend-arts-borstprothesen-transvrouwen" target="_blank" rel="noopener" class="external">medische verklaring over het behandeltraject</a> dat u tot nu toe heeft gevolgd moet zijn ingevuld door de BIG-geregistreerde arts waar u in behandeling bent. Dit kan een huisarts of medisch specialist zijn die de hormonen voorschrijft en de behandeling begeleidt. De verklaring mag niet ouder zijn dan twee maanden.</p>'
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Medische verklaring van het type behandeling</h3><p>De <a title="Format verklaring type behandeling op dus-i.nl " href="https://www.dus-i.nl/subsidies/borstprothesen-transvrouwen/documenten/publicaties/2021/08/05/medische-verklaring-van-het-type-behandeling-borstprothesen-transvrouwen" target="_blank" rel="noopener" class="external">medische verklaring van het type behandeling</a> (operatie) dat zal worden uitgevoerd moet zijn ingevuld en ondertekend door een BIG-geregistreerde arts.</p>'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/medicalCertificateTreatmentType',
            options: {
              description: 'form.component.fileInput.description',
              accept: 'image/*'
            }
          },
          {
            type: 'FormHtml',
            options: {
              html: '<h3>Ondertekenen</h3>'
            }
          },
          {
            type: 'CustomControl',
            scope: '#/properties/signed',
            options: {
              description: 'form.fields.signed.description'
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
        properties
      },
      title: 'Start'
    },
    {
      uischema: secondSchema,
      schema: {
        required: [
          'firstName',
          'lastName',
          'streetName',
          'houseNumber',
          'zipCode',
          'city',
          'phoneNumber',
          'email',
          'dayOfBirth',
          'accountHolderName',
          'iban'
        ],
        properties
      },
      title: 'Contactgegevens aanvrager'
    },
    {
      uischema: thirdSchema,
      schema: {
        required: ['signed', 'bankStatement'],
        properties
      },
      title: 'Controleren, uploaden en verzenden'
    }
  ]
}

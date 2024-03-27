import {
  required as personalInformationRequired,
  properties as personalInformationProperties,
  elements as personalInformationElements
} from '@shared/fixtures/form/elements/personal-form-elements'

import {
  fileUploadProperties,
  fileUploadOptions
} from '@shared/fixtures/form/elements/file-upload-element'

export default async () => {
  const fromExamplePage1 = await Object.values(
    import.meta.glob('@shared/fixtures/form/data/borst-prothesen-transvrouwen.html', {
      as: 'raw'
    })
  )[0]()

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
                'Ik geef toestemming voor het verwerken van mijn persoonsgegevens voor deze aanvraag.'
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
      ...personalInformationElements
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
                  ...fileUploadOptions,
                  tip: 'Op de kopie van een recent bankafschrift moeten het rekeningnummer en uw naam zichtbaar zijn. Adres en datum mogen ook, maar zijn niet verplicht. Maak de andere gegevens onleesbaar. U mag ook een afdruk van internet bankieren gebruiken of een kopie van uw bankpas. Zie ook dit <a title="voorbeeld" href="#" target="_blank" rel="noopener" class="external">voorbeeld</a>. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
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
                  ...fileUploadOptions,
                  tip: 'U kunt een uittreksel uit het bevolkingsregister (de Basisregistratie personen) opvragen bij de gemeente waar u staat ingeschreven. Dit document bevat uw naam, geboortedatum en adres. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
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
                  ...fileUploadOptions,
                  tip: 'De <a title="medische verklaring over het behandeltraject" href="#" target="_blank" rel="noopener" class="external">medische verklaring over het behandeltraject</a> dat u tot nu toe heeft gevolgd moet zijn ingevuld door de BIG-geregistreerde arts waar u in behandeling bent. Dit kan een huisarts of medisch specialist zijn die de hormonen voorschrijft en de behandeling begeleidt. De verklaring mag niet ouder zijn dan twee maanden. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
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
                  ...fileUploadOptions,
                  tip: 'De <a title="medische verklaring van het type behandeling" href="#" target="_blank" rel="noopener" class="external">medische verklaring van het type behandeling</a> (operatie) dat zal worden uitgevoerd moet zijn ingevuld en ondertekend door een BIG-geregistreerde arts. Toegestane bestandstypen: pdf, jpg, jpeg, png, Maximale bestandsgrootte: 20 MB.'
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
                'E-mailadres': '{email}'
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

  return {
    title: 'Aanvraagformulier subsidieregeling borstprothesen transvrouwen',
    data: [
      {
        uischema: firstSchema,
        dataschema: {
          properties: {
            permissionToProcessPersonalData: {
              type: 'boolean',
              const: true,
              title: 'Verwerking'
            }
          },
          required: ['permissionToProcessPersonalData']
        }
      },
      {
        uischema: secondSchema,
        dataschema: {
          required: [...personalInformationRequired],
          properties: personalInformationProperties
        },
        title: 'Persoonsgegevens toevoegen'
      },
      {
        uischema: thirdSchema,
        dataschema: {
          required: [
            'bankStatement',
            'extractPersonalRecordsDatabase',
            'proofOfMedicalTreatment',
            'proofOfTypeOfMedicalTreatment'
          ],
          properties: {
            bankStatement: {
              title: 'Kopie bankafschrift',
              ...fileUploadProperties
            },
            extractPersonalRecordsDatabase: {
              title: 'Uittreksel bevolkingsregister',
              ...fileUploadProperties
            },
            proofOfMedicalTreatment: {
              title: 'Verklaring behandeltraject',
              ...fileUploadProperties
            },
            proofOfTypeOfMedicalTreatment: {
              title: 'Verklaring type behandeling',
              ...fileUploadProperties
            }
          }
        },
        title: 'Documenten toevoegen'
      },
      {
        uischema: lastSchema,
        dataschema: {
          required: ['truth'],
          properties: {
            truth: {
              type: 'boolean',
              const: true,
              title: 'Inhoud'
            }
          }
        },
        title: 'Controleren en ondertekenen'
      }
    ]
  } as any
}

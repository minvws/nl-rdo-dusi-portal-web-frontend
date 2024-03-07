import {
  fileUploadOptions,
  fileUploadProperties
} from '@shared/fixtures/form/elements/file-upload-element'

export default () => {
  return {
    data: [
      {
        uischema: {
          type: 'FormGroupControl',
          options: { section: true },
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Group',
                  elements: [
                    {
                      elements: [
                        {
                          label: 'Medisch onderzoeksverslag (medische rapportage)',
                          options: {
                            ...fileUploadOptions,
                            validation: ['onInput']
                          },
                          scope: '#/properties/socialMedicalAssessment',
                          type: 'CustomControl'
                        }
                      ],
                      type: 'VerticalLayout'
                    },
                    {
                      elements: [
                        {
                          label: 'Verklaring arts',
                          options: {
                            ...fileUploadOptions
                          },
                          scope: '#/properties/doctorsCertificate',
                          type: 'CustomControl'
                        }
                      ],
                      type: 'VerticalLayout'
                    }
                  ]
                }
              ]
            }
          ]
        },
        dataschema: {
          required: ['doctorsCertificate', 'socialMedicalAssessment'],
          properties: {
            doctorsCertificate: {
              ...fileUploadProperties,
              title: 'Verklaring arts'
            },
            socialMedicalAssessment: {
              ...fileUploadProperties,
              title: 'Medisch onderzoeksverslag'
            }
          }
        },
        title: 'Start'
      }
    ]
  }
}

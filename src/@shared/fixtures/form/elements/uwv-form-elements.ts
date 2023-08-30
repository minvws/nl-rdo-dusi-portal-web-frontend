export const required = ['uwv']

export const properties = {
  uwv: {
    type: 'string',
    file: true,
    title: 'Kopie bankafschrift'
  }
}

export const elements = [
  {
    type: 'Group',
    label: 'UWV',
    elements: [
      {
        type: 'CustomControl',
        scope: '#/properties/uwv',
        label: 'Gewaarmerkt verzekeringsbericht',
        options: {
          accept: 'image/*,.pdf',
          maxFileSize: 5242880
        }
      }
    ]
  }
]

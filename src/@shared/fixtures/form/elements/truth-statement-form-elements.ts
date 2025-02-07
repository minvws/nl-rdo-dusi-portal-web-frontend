export const elements = [
  {
    label: 'Ondertekenen',
    type: 'Group',
    elements: [
      {
        label: 'Waarheidsverklaring',
        options: {
          description: 'Ik verklaar het formulier naar waarheid te hebben ingevuld.'
        },
        scope: '#/properties/truthfullyCompleted',
        type: 'CustomControl'
      }
    ]
  }
]

export const properties = {
  truthfullyCompleted: {
    const: true,
    title: '',
    type: 'boolean'
  }
}

export const required = ['truthfullyCompleted']

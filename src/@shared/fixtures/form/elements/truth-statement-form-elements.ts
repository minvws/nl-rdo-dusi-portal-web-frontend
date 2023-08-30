export const required = ['truthStatement']

export const properties = {
  truthStatement: {
    type: 'boolean',
    const: true,
    title: 'Waarheidsverklaring'
  }
}

export const elements = [
  {
    type: 'Group',
    label: 'Ondertekenen',
    elements: [
      {
        type: 'CustomControl',
        scope: '#/properties/truthStatement',
        label: 'Waarheidsverklaring',
        options: {
          description: 'Ik verklaar het formulier naar waarheid te hebben ingevuld.'
        }
      }
    ]
  }
]

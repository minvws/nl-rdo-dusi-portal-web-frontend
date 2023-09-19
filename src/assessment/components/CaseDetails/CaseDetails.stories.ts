import type { Meta, StoryObj } from '@storybook/vue3'

import CaseDetails from './CaseDetails.vue'

const meta: Meta<typeof CaseDetails> = {
  title: 'assessment/CaseDetails',
  component: CaseDetails
}

export default meta

type Story = StoryObj<typeof CaseDetails>

export const Default: Story = {
  render: args => ({
    components: { CaseDetails },
    setup() {
      return { args }
    },
    template: '<CaseDetails v-bind="args" />'
  }),
  args: {
    items: [
      {
        title: 'Lorem ipsum',
        items: [
          { term: 'Tempor vitae eleifend', type: 'string', text: 'Mauris semper cursus diam' },
          { term: 'Fermentum non dui', type: 'string', text: 'Interdum urna interdum' }
        ]
      },
      {
        title: 'Nullam nec odio',
        items: [
          { term: 'Mauris bibendum', type: 'url', url: '/url', text: 'Mauris semper cursus diam' },
          { term: 'Euismod magna', type: 'url', url: '/url', text: 'Quisque vulputate sapien' }
        ]
      },
      {
        title: 'Aenean in elit maximus',
        items: [
          { term: 'Suspendisse potenti', type: 'date', text: '01/02/2023' },
          { term: 'Posuere diam', type: 'date', text: '01/03/2023' }
        ]
      }
    ]
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'

import RequestDetails from './RequestDetails.vue'

const meta: Meta<typeof RequestDetails> = {
  title: 'assessment/RequestDetails',
  component: RequestDetails
}

export default meta

type Story = StoryObj<typeof RequestDetails>

export const Default: Story = {
  render: args => ({
    components: { RequestDetails },
    setup() {
      return { args }
    },
    template: '<RequestDetails v-bind="args" />'
  }),
  args: {
    items: [
      {
        title: 'Lorem ipsum',
        data: {
          'Tempor vitae eleifend': { type: 'string', text: 'Mauris semper cursus diam' },
          'Fermentum non dui': { type: 'string', text: 'Interdum urna interdum' }
        }
      },
      {
        title: 'Nullam nec odio',
        data: {
          'Mauris bibendum': { type: 'url', url: '/url', text: 'Mauris semper cursus diam' },
          'Euismod magna': { type: 'url', url: '/url', text: 'Quisque vulputate sapien' }
        }
      },
      {
        title: 'Aenean in elit maximus',
        data: {
          'Suspendisse potenti': { type: 'date', text: '01/02/2023' },
          'Posuere diam': { type: 'date', text: '01/03/2023' }
        }
      }
    ]
  }
}

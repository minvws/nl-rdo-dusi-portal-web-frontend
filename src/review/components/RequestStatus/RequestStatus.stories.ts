import type { Meta, StoryObj } from '@storybook/vue3'

import RequestStatus from './RequestStatus.vue'

const meta: Meta<typeof RequestStatus> = {
  title: 'RequestStatus',
  component: RequestStatus
}

export default meta

type Story = StoryObj<typeof RequestStatus>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { RequestStatus },
    setup() {
      return { args }
    },
    template: '<RequestStatus v-bind="args" />'
  }),
  argTypes: {
    type: {
      options: ['Nieuw', 'In behandeling', 'Goedgekeurd', 'Afgekeurd'],
      mapping: {
        Nieuw: 'new',
        'In behandeling': 'inProgress',
        Goedgekeurd: 'approved',
        Afgekeurd: 'rejected'
      },
      control: { type: 'radio' }
    }
  },
  args: {
    type: 'new'
  }
}

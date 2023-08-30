import type { Meta, StoryObj } from '@storybook/vue3'

import CaseStatus from './CaseStatus.vue'

const meta: Meta<typeof CaseStatus> = {
  title: 'assessment/CaseStatus',
  component: CaseStatus
}

export default meta

type Story = StoryObj<typeof CaseStatus>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { CaseStatus },
    setup() {
      return { args }
    },
    template: '<CaseStatus v-bind="args" />'
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

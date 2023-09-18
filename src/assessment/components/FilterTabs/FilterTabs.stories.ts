import type { Meta, StoryObj } from '@storybook/vue3'

import FilterTabs from './FilterTabs.vue'

const meta: Meta<typeof FilterTabs> = {
  title: 'assessment/FilterTabs',
  component: FilterTabs
}

export default meta

type Story = StoryObj<typeof FilterTabs>

export const Default: Story = {
  render: args => ({
    components: { FilterTabs },
    setup() {
      return { args }
    },
    template: '<FilterTabs v-bind="args" />'
  }),
  argTypes: { onChange: { action: 'Filter selected' } },
  args: {
    items: [
      { text: 'Hoge Prioriteit', id: 'priority', count: 8 },
      { text: 'Opgepakt', id: 'assigned', count: 10 },
      { text: 'Aan mij toegekend', id: 'assigned-to-me', count: 4 },
      { text: 'Al mijn zaken', id: 'all-cases', count: 16 }
    ]
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'

import FilterTabs from './FilterTabs.vue'

const meta: Meta<typeof FilterTabs> = {
  title: 'review/FilterTabs',
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
      { text: 'Hoge Prioriteit', value: 8 },
      { text: 'Opgepakt', value: 10 },
      { text: 'Aan mij toegekend', value: 4 },
      { text: 'Al mijn zaken', value: 16 }
    ]
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'

import DescriptionList from './DescriptionList.vue'

const meta: Meta<typeof DescriptionList> = {
  title: 'DescriptionList',
  component: DescriptionList
}

export default meta

type Story = StoryObj<typeof DescriptionList>

export const Default: Story = {
  render: args => ({
    components: { DescriptionList },
    setup() {
      return { args }
    },
    template: '<DescriptionList v-bind="args" />'
  }),
  args: {
    items: [
      { term: 'Lacinia nunc', details: { type: 'string', text: 'Mauris semper cursus diam' } },
      { term: 'Quis varius', details: { type: 'date', text: '01/01/2023' } },
      { term: 'Luctus mollis', details: { type: 'url', url: '/url', text: 'Porta magna enim' } },
      {
        term: 'Phasellus convallis',
        details: { type: 'string', text: 'Phasellus congue massa metus' }
      }
    ]
  }
}

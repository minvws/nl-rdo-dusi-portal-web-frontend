import type { Meta, StoryObj } from '@storybook/vue3'

import DescriptionList from './DescriptionList.vue'

const meta: Meta<typeof DescriptionList> = {
  title: 'core/DescriptionList',
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
      { term: 'Lacinia nunc', type: 'string', text: 'Mauris semper cursus diam' },
      { term: 'Quis varius', type: 'date', text: '01/01/2023' },
      { term: 'Luctus mollis', type: 'url', url: '/url', text: 'Porta magna enim' },
      { term: 'Phasellus convallis', type: 'string', text: 'Phasellus congue massa metus' }
    ]
  }
}

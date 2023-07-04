import type { Meta, StoryObj } from '@storybook/vue3'

import AppTable from './AppTable.vue'

const meta: Meta<typeof AppTable> = {
  title: 'AppTable',
  component: AppTable
}

export default meta

type Story = StoryObj<typeof AppTable>

export const Default: Story = {
  render: args => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: '<AppTable v-bind="args" />'
  }),
  args: {
    caption: 'Lorem ipsum dolor sit amet',
    headings: [
      { text: 'Sed posuere' },
      { text: 'Odio' },
      { text: 'Suspendisse' },
      { text: 'Scelerisque' }
    ],
    items: [
      [{ text: 'Lacinia nunc' }, { text: '159' }, { text: '6.0' }, { text: '24' }],
      [{ text: 'Convallis sapien' }, { text: '237' }, { text: '9.0' }, { text: '37' }]
    ],
    footer: [[{ text: 'Bibendum' }, { text: '396' }, { text: '15.0' }, { text: '61' }]]
  }
}

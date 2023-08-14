import type { Meta, StoryObj } from '@storybook/vue3'
import Component from '@shared/components/MessageList/MessageList.vue'

const meta: Meta<typeof Component> = {
  title: 'core/MessageList',
  component: Component
}

export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { Component },
      setup() {
        return { args }
      },
      template: '<Component v-bind="args" :key="JSON.stringify(args)"/>'
    }
  },
  args: {
    items: [
      {
        date: '2022-02-01',
        link: '/mock/shared/assets/test.pdf',
        title: 'Example of a title'
      },
      {
        date: '2022-03-02',
        link: '/mock/shared/assets/test.pdf',
        title: 'Example of a longer title'
      },
      {
        date: '2022-03-04',
        link: '/mock/shared/assets/test.pdf',
        title: 'Example of a very very very long title'
      }
    ]
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'

import FormNotification from './FormNotification.vue'

const meta: Meta<typeof FormNotification> = {
  title: 'Forms/FormNotification',
  component: FormNotification
}

export default meta
type Story = StoryObj<typeof FormNotification>

export const Default: Story = {
  render: args => ({
    components: { FormNotification },
    setup() {
      return { args }
    },
    template: '<FormNotification v-bind="args" />'
  }),
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: ['error', 'warning', 'explanation', 'success']
    }
  },
  args: {
    type: 'error',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
}

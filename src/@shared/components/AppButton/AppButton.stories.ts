import type { Meta, StoryObj } from '@storybook/vue3'

import AppButton from './AppButton.vue'

const meta: Meta<typeof AppButton> = {
  title: 'core/AppButton',
  component: AppButton
}

export default meta

type Story = StoryObj<typeof AppButton>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { AppButton },
    setup() {
      return { args }
    },
    template: '<AppButton v-bind="args">{{ args.default }}</AppButton>'
  }),
  argTypes: {
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' }
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Badge'
    }
  },
  args: {
    type: 'button',
    disabled: false,
    default: 'Button'
  }
}

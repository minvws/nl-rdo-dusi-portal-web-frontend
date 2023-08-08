import type { Meta, StoryObj } from '@storybook/vue3'

import FormRequiredLabel from '@/shared/components/form/FormRequiredLabel/FormRequiredLabel.vue'

const meta: Meta<typeof FormRequiredLabel> = {
  title: 'forms/FormRequiredLabel',
  component: FormRequiredLabel
}

export default meta

type Story = StoryObj<typeof FormRequiredLabel>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormRequiredLabel },
      setup() {
        return { args }
      },
      template: '<FormRequiredLabel v-bind="args" :key="JSON.stringify(args)"/>'
    }
  },
  args: {
    required: false
  }
}

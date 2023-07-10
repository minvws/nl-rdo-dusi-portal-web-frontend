import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldError from '@/components/form/FormFieldError/FormFieldError.vue'

const meta: Meta<typeof FormFieldError> = {
  title: 'forms/FormFieldError',
  component: FormFieldError
}

export default meta

type Story = StoryObj<typeof FormFieldError>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormFieldError },
      setup() {
        return { args }
      },
      template: '<FormFieldError v-bind="args" />'
    }
  },
  args: {
    errors: 'errors'
  }
}

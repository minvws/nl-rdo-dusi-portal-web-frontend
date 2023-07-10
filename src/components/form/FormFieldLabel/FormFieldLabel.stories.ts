import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldLabel from '@/components/form/FormFieldLabel/FormFieldLabel.vue'

const meta: Meta<typeof FormFieldLabel> = {
  title: 'forms/FormFieldLabel',
  component: FormFieldLabel
}

export default meta

type Story = StoryObj<typeof FormFieldLabel>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FormFieldLabel },
    setup() {
      return { args }
    },
    template: '<FormFieldLabel v-bind="args" />'
  }),
  args: {
    label: 'label'
  }
}

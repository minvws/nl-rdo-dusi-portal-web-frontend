import type { Meta, StoryObj } from '@storybook/vue3'

import FormFieldLabel from '@shared/components/FormFieldLabel/FormFieldLabel.vue'

const meta: Meta<typeof FormFieldLabel> = {
  title: 'core/form/FormFieldLabel',
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

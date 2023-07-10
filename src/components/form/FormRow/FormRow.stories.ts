import type { Meta, StoryObj } from '@storybook/vue3'

import FormRow from '@/components/form/FormRow/FormRow.vue'

const meta: Meta<typeof FormRow> = {
  title: 'forms/FormRow',
  component: FormRow
}

export default meta

type Story = StoryObj<typeof FormRow>

export const Default: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FormRow },
    setup() {
      return { args }
    },
    template: `
      <FormRow v-bind="args">
        <input />
      </FormRow>
    `
  }),
  args: {
    id: 'row',
    label: 'storybook'
  }
}

export const Error: Story = {
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FormRow },
    setup() {
      return { args }
    },
    template: `
      <FormRow v-bind="args">
        <input />
      </FormRow>
    `
  }),
  args: {
    id: 'row',
    label: 'storybook',
    errors: 'Something went wrong'
  }
}

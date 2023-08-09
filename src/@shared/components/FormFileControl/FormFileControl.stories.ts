import type { Meta, StoryObj } from '@storybook/vue3'
import FormView from '@shared/components/FormView/FormView.vue'

const meta: Meta<typeof FormView> = {
  title: 'core/form/Controls/FormFileControl',
  component: FormView
}

export default meta

type Story = StoryObj<typeof FormView>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormView },
      setup() {
        return { args }
      },
      template: '<FormView v-bind="args" :key="JSON.stringify(args)"/>'
    }
  },
  args: {
    id: 'id',
    forms: [
      {
        uischema: {
          type: 'FormGroupControl',
          options: { section: true },
          elements: [
            {
              type: 'CustomControl',
              scope: '#/properties/storybook',
              options: {
                accept: 'image/*',
                description: 'form.component.fileInput.description'
              }
            }
          ]
        },
        schema: {
          required: ['storybook'],
          properties: {
            storybook: {
              type: 'string',
              file: true
            }
          }
        }
      }
    ]
  }
}

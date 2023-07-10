import type { Meta, StoryObj } from '@storybook/vue3'
import AppContent from '@/components/AppContent/AppContent.vue'
import FormLoader from '@/components/form/FormLoader/FormLoader.vue'

const meta: Meta<typeof FormLoader> = {
  title: 'forms/FormLoader',
  component: FormLoader
}

export default meta

type Story = StoryObj<typeof FormLoader>

export const Default: Story = {
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: { FormLoader, AppContent },
      setup() {
        return { args }
      },
      template: '<AppContent><FormLoader v-bind="args" :key="JSON.stringify(args)"/></AppContent>'
    }
  },
  argTypes: {
    id: {
      control: 'text'
    }
  },
  args: {
    id: '1'
  }
}
